import os
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
# pyrefly: ignore [missing-import]
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import httpx
from dotenv import load_dotenv

load_dotenv()

# Initialize Rate Limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Environment Variables
FRONTEND_URL = os.getenv("FRONTEND_URL", "*")

# Parse comma-separated origins (e.g. "https://arcvex.in,https://www.arcvex.in")
allowed_origins = [url.strip() for url in FRONTEND_URL.split(",")] if FRONTEND_URL != "*" else ["*"]

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

WEBHOOK_URL = os.getenv("GOOGLE_SHEETS_WEBHOOK_URL")
TURNSTILE_SECRET = os.getenv("TURNSTILE_SECRET_KEY")

class ContactForm(BaseModel):
    name: str = Field(..., max_length=100)
    email: EmailStr
    subject: str = Field(..., max_length=200)
    message: str = Field(..., max_length=2000)
    captchaToken: str

async def verify_turnstile(token: str) -> bool:
    if not TURNSTILE_SECRET:
        # If no secret is configured, assume development mode or bypass
        print("WARNING: TURNSTILE_SECRET_KEY not set. Bypassing CAPTCHA verification.")
        return True
        
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            data={
                "secret": TURNSTILE_SECRET,
                "response": token
            }
        )
        result = response.json()
        return result.get("success", False)

@app.get('/')
def read_root():
    return {"Hello": "World"}

@app.get("/customer-support")
def customer_support():
    return {"message": "Welcome to Customer Support!"}

@app.post("/contact")
@limiter.limit("5/minute")
async def handle_contact_form(request: Request, form_data: ContactForm):
    # 1. Verify CAPTCHA
    is_valid_captcha = await verify_turnstile(form_data.captchaToken)
    if not is_valid_captcha:
        raise HTTPException(status_code=400, detail="Invalid CAPTCHA token")

    # 2. Forward to Google Sheets Webhook
    if not WEBHOOK_URL:
        raise HTTPException(status_code=500, detail="Google Sheets Webhook URL is not configured")

    async with httpx.AsyncClient() as client:
        try:
            # Send data to Apps Script. We strip out the captchaToken since it's verified.
            payload = {
                "name": form_data.name,
                "email": form_data.email,
                "subject": form_data.subject,
                "message": form_data.message
            }
            # Apps script webhooks typically expect followed redirects to work properly
            response = await client.post(WEBHOOK_URL, json=payload, follow_redirects=True)
            response.raise_for_status()
            
            # The Apps Script we wrote returns JSON {"result": "success"}
            return {"status": "success", "message": "Message successfully submitted."}
            
        except httpx.HTTPError as e:
            print(f"Error forwarding to Google Sheets: {e}")
            raise HTTPException(status_code=502, detail="Failed to forward request to storage")