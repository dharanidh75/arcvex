---
name: arcvex-ui-ux
description: ArcVex brand, UI/UX design system, and motion/animation standards. Use this whenever designing, redesigning, or building any ArcVex website page, component, section, or interaction — including hero sections, navigation, cards, buttons, scroll behavior, text animation, and cursor behavior.
---

# ArcVex UI/UX & Motion Design System

## Brand Identity
ArcVex is a software development and AI automation studio (Coimbatore, India). The brand should read as: premium, technical, confident, minimal — closer to a serious dev-tooling company (Linear, Vercel, Stripe) than a generic agency template.

## Theme Direction — LOCKED
**Dark theme only.** Do not default to light/cream backgrounds for the main site. This decision has been made deliberately:
- Cinematic motion, video-adjacent visuals, and the emerald accent color all read stronger on dark backgrounds.
- The target audience (technical founders, developers) associates dark UI with serious tooling.
- Do not propose or fall back to a light-mode hero. If a light section is ever needed (e.g. a light card on an otherwise dark page), treat it as an exception, not the base theme.

## Color System (dark theme mapping — use these exact values)
| Role | Hex | Notes |
|---|---|---|
| Main background | `#1C1917` | Deep Espresso — primary page background |
| Card/surface background | `#26221F` or `#2A2724` | Slightly lighter than main bg |
| Main text | `#FDFBF7` or `#FFFFFF` | Warm cream / white |
| Muted text | `#9CA3AF` | Gray 400 — NOT `#6B7280`, which is too low-contrast on dark |
| Borders/inputs | `rgba(255,255,255,0.10)` | Soft white, not a flat gray swatch |
| Muted backgrounds | `rgba(255,255,255,0.05)` | |
| **Accent (primary)** | `#15CF89` | Emerald Green — buttons, links, highlighted words, active states |
| Error/destructive | `#EF4444` or `#F87171` if too dark against espresso | |

**CTA buttons:** solid emerald green background (`#15CF89`) with espresso text (`#1C1917`), OR a white-text/green-outline ghost button. Never a dark-on-dark button (invisible on this theme).

## Typography
Bold, tight-tracking grotesk/sans as the primary display face (used for the ARCVEX wordmark and major headlines). Pair with a serif italic for taglines/quotes (e.g. "We build digital futures.") as a signature detail — this contrast is intentional and should be preserved across the redesign.

## Redesign Scope — IMPORTANT
**This is a complete redesign, not an iteration.** Do not reuse layout patterns, section structure, or visual treatment from the current live site (arcvex.in) or the "new UI" mockup previously explored (the light/cream version with a static hero). Both of those are considered superseded. Treat this as designing from a blank canvas, using only: this design system, the color/typography rules above, and the motion/interaction system below.

## Motion & Interaction System
Reference agencies studied for this system: Cuberto, Ramotion, Instrument, Clay. Confirmed stack used by Cuberto (closest match to target quality bar): GSAP + ScrollTrigger + Three.js + Lenis smooth scroll + custom magnetic cursor.

### Required stack
- **GSAP** (core + ScrollTrigger) — primary animation engine
- **GSAP SplitText + ScrambleTextPlugin** — for text scramble/decode and split-line scroll reveals
- **Lenis** — smooth/eased scroll across the whole site
- **Custom magnetic cursor** — either Cuberto Mouse Follower (open-source npm package) or a lightweight custom-built equivalent
- **Framer Motion** — acceptable for simple component-level transitions (menus, modals) alongside GSAP, not as a replacement for it
- Three.js / `@react-three/fiber` — optional, only if a 3D element is explicitly requested later; not required for v1

### Required interaction patterns
1. **Hero wordmark ("ARCVEX")** — scramble/decode-in on page load: letters resolve from random characters to the real wordmark.
2. **Tagline** — split-word fade-up, staggered, triggered immediately after the wordmark resolves.
3. **Section headings (throughout site)** — split-line reveal on scroll (ScrollTrigger-triggered as each heading enters viewport).
4. **Work/project cards** — scroll-triggered fade/slide-in on entry, hover-lift (scale + shadow, eased not linear), hover-reveal preview (image or short looping video inside the card).
5. **Cursor** — custom dot/ring cursor site-wide; expands, morphs, or shows text ("View", "Explore") when hovering interactive elements; subtle magnetic pull toward buttons/links on proximity.
6. **Scroll behavior** — smooth/eased site-wide scroll via Lenis, not native browser scroll.
7. **Background texture (optional, in place of the previously-planned hero video)** — the topographic contour-line pattern (already generated as a procedural asset) can be reimplemented as a lightweight animated SVG/Canvas background on a section — native, no video file, fully controllable in code.

### What to avoid
- No native browser `:hover` instant color swaps — transitions should be eased.
- No hard page-load spinners/intro sequences unless explicitly requested — they hurt perceived performance if overused.
- No text animation library other than GSAP's SplitText/ScrambleTextPlugin unless there's a specific technical reason (keep the animation system consistent, not mixed).
