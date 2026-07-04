# Digital Moon Agency — Design Documentation

This document describes the design language, layout system, component
architecture, styling conventions, and file structure of the project.

---

## 1. Overview

**Digital Moon Agency** is a single-page marketing site for a digital agency
(web design, development, brand strategy, digital marketing). It is built as a
dark, high-contrast, editorial marketing surface with a signature neon-green
accent and smooth motion throughout.

- **Stack:** React 18 + Vite + Tailwind CSS v3 + shadcn/ui (Radix primitives)
- **Routing:** React Router (single route `/` → `HomePage`)
- **Animation:** `framer-motion`
- **Icons:** `lucide-react`
- **Meta/SEO:** `react-helmet`
- **App shell:** `apps/web`, dev server on port `3000`

---

## 2. Design language

### Mood & thesis
A confident, premium agency identity: near-black canvas, crisp white
typography, and a single electric-green accent used sparingly for energy and
calls to action. The tone is modern, bold, and slightly kinetic.

### Design dials
- **DESIGN_VARIANCE:** ~5 — mostly symmetric grids with intentional vertical
  offsets on project cards (`md:mt-12`).
- **MOTION_INTENSITY:** ~6 — scroll-reveal sections, hover lifts, a logo
  marquee, and a spring-animated modal.
- **VISUAL_DENSITY:** ~3 — airy, generous spacing, large display type.

---

## 3. Color system

Colors are defined as CSS variables in `apps/web/src/index.css` (both `:root`
and `.dark`) and exposed to Tailwind via `tailwind.config.js`. Use semantic
utilities (`bg-background`, `text-foreground`, `bg-accent`, etc.) rather than
hardcoded palette names.

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `5 5 5` (near-black) | Page canvas |
| `--foreground` | `255 255 255` | Primary text |
| `--card` | `15 15 15` | Card / modal surfaces |
| `--muted` | `26 26 26` | Muted surfaces |
| `--muted-foreground` | `163 163 163` | Secondary text |
| `--accent` / `--primary` | `hsl(114 96% 76%)` ≈ `#95FC89` | Neon-green accent |
| `--accent-foreground` | `0 0 0` | Text on accent |
| `--border` / `--input` | `42 42 42` | Hairline borders |
| `--ring` | `hsl(114 96% 76%)` | Focus ring |
| `--destructive` | `239 68 68` | Errors |

- Single warm-neutral gray family on a dark base.
- The accent green is the only chromatic color; used for CTAs, hover states,
  focus rings, section markers, and links.
- Accent glow shadows use `rgba(149,252,137,...)` (the hex form of the accent).

---

## 4. Typography

- **Family:** `Plus Jakarta Sans` (Google Fonts, weights 300–800), imported at
  the top of `index.css`, with system-sans fallback.
- **Display headlines:** extra-bold, tight tracking (`letter-spacing: -0.02em`),
  fluid sizing on the hero via `clamp(3rem, 13vw, 10rem)`.
- **Section headings:** `text-4xl`–`text-7xl`, bold/extrabold, white.
- **Body:** `text-white/60`–`text-white/80`, relaxed line-height.
- **Eyebrows:** small uppercase, wide tracking, accent-colored.
- Global niceties: `text-wrap: balance` on headings, `text-wrap: pretty` on
  paragraphs, antialiased rendering, kerning/ligatures enabled.

---

## 5. Layout & structure

### Global shell (`apps/web/src/App.jsx`)
```
<Router>
  <ScrollToTop />        // resets scroll on route change
  <Header />             // fixed top nav
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
</Router>
```

### Page rhythm (`HomePage.jsx`)
Scroll story — **hero → trust → services → work → contact/footer**:

1. **Hero** — full-bleed background image at 20% opacity with a
   background-to-transparent gradient, giant animated headline, subhead, and a
   single accent CTA. Bottom corners hold a stacked team-avatar "trusted by"
   cluster and an email link.
2. **ClientLogos** — infinite dual-set logo marquee ("Trusted by innovative
   teams worldwide") with edge fade masks.
3. **Services** (`#services`) — centered intro + a 2-column responsive grid of
   `ServiceCard`s with three surface variants.
4. **Selected Work** (`#work`) — 2-column grid of `ProjectCard`s with alternating
   vertical offset; clicking opens `ProjectModal`.
5. **Contact / Footer** (`#contact`) — oversized "LET'S WORK TOGETHER" CTA,
   social icons, legal links, copyright.

### Layout conventions
- Section content rail: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Section vertical padding: `py-24` / `py-32`.
- Each major section is topped by a small centered accent marker bar
  (`w-24 h-1 bg-accent rounded-b-full opacity-50`).
- Hero uses `min-h-screen`; sections collapse to single column below `md`.
- Corner radius from `--radius: 8px`; cards/buttons use `rounded-xl`/`rounded-2xl`.

---

## 6. Components

Located in `apps/web/src/components/`.

| Component | Responsibility |
| --- | --- |
| `Header.jsx` | Fixed nav; transparent → `glass` + border on scroll (`scrollY > 20`). Desktop links + "Get Started" CTA; mobile hamburger opens an animated `glass` dropdown. Anchor links smooth-scroll to sections. |
| `ScrollToTop.jsx` | Scrolls to top on route change. |
| `ClientLogos.jsx` | Two duplicated logo rows animated with the `animate-marquee` keyframe for a seamless loop; pauses on hover / reduced-motion; gradient edge masks. |
| `ServiceCard.jsx` | Motion-reveal service tile. Variants `default` / `muted` / `accent` change surface + border. Icon badge fills accent on hover; card lifts with accent glow shadow. |
| `ProjectCard.jsx` | Clickable/keyboard-accessible project tile (`role="button"`). 4:3 image with zoom-on-hover, gradient overlay, and a rotating accent `ArrowUpRight` badge. Optional `offset` adds `md:mt-12`. |
| `ProjectModal.jsx` | Portal-less overlay modal: backdrop blur + click-to-close, ESC key, body scroll lock. Spring entrance. Renders hero image, category badge, description, key deliverables (checklist), technology tags, results panel, and a CTA. |
| `SocialIcon.jsx` | Social link icon button used in the footer. |
| `ui/*` | shadcn/Radix primitives (see below). |

### Data model
`HomePage.jsx` holds local data arrays: `services`, `projects` (each with
`image`, `title`, `category`, `description[]`, `features[]`, `technologies[]`,
`results`, `ctaUrl`), and `teamAvatars`.

---

## 7. shadcn / UI primitives

Reusable Radix-based primitives live in `apps/web/src/components/ui/`
(button, card, dialog, sheet, select, tabs, tooltip, accordion, calendar,
carousel, chart, command, form, sidebar, sonner/toaster, etc.). Configured via
`components.json` (`new-york` style, `neutral` base, CSS variables, aliases
`@/components`, `@/lib`, `@/hooks`).

> Convention: these are interaction/accessibility primitives. Marketing
> surfaces here are built as custom semantic HTML + Tailwind rather than raw
> shadcn cards, so the brand identity carries the visuals.

---

## 8. Styling conventions

- **Tailwind-first** with semantic tokens; theme values defined as CSS
  variables before use.
- **Glass utilities** in `index.css`: `.glass`, `.glass-light`, `.glass-modal`
  (translucent backgrounds + backdrop blur) — used by header and menus.
- **Transition utilities:** `.transition-smooth/slow/slower` with cubic-bezier
  easing; interaction feedback under 300ms.
- **Hover language:** `-translate-y` lifts, `scale-[0.98]` active press, accent
  glow shadows, animated underlines.
- **Focus:** consistent `focus-visible:outline outline-2 outline-accent` on all
  interactive elements for keyboard accessibility.
- **Motion keyframe:** `marquee` (translateX 0 → -100%, 30s linear infinite)
  defined in `index.css`; Radix accordion keyframes in `tailwind.config.js`.

---

## 9. File map (`apps/web`)

```
src/
  main.jsx              // ReactDOM bootstrap + index.css
  App.jsx               // Router + Header + ScrollToTop
  index.css             // Tailwind layers, theme vars, glass + marquee utils
  pages/
    HomePage.jsx        // all page sections + data + modal state
  components/
    Header.jsx
    ScrollToTop.jsx
    ClientLogos.jsx
    ServiceCard.jsx
    ProjectCard.jsx
    ProjectModal.jsx
    SocialIcon.jsx
    ui/*                // shadcn/Radix primitives
  hooks/
    use-mobile.jsx      // breakpoint hook
    use-toast.js        // toast state
  lib/
    utils.js            // cn() helper (clsx + tailwind-merge)
tailwind.config.js      // theme mapping to CSS variables
components.json         // shadcn config
vite.config.js          // Vite + Horizons editor/runtime plugins
```

---

## 10. Accessibility & performance

- Keyboard-operable cards and modal (Enter/Space activation, ESC to close,
  focus rings everywhere).
- `prefers-reduced-motion` honored by the marquee.
- Only `transform`/`opacity` are animated; grain/overlays are
  `pointer-events-none`.
- Semantic landmarks (`header`, `main`, `section`, `nav`) and descriptive
  `alt` text / `aria-label`s.
- SEO title + description set via `react-helmet` in `HomePage`.
