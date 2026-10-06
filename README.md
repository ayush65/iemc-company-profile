# IEMC India Pvt. Ltd. — Company Profile

Premium single-page company website for IEMC India Pvt. Ltd. — industrial & technology solutions, Hosur, Tamil Nadu.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Framer Motion · clean white/light design system

## Highlights

- Clean light design: white surfaces, brand-navy text, electric-blue accents
- Hero with masked line-by-line text reveals, parallax media, and animated counters
- Custom animation primitives (`FadeIn`, `Stagger`, `RevealLines`, `Parallax`, `Counter`, `Magnetic`)
- Alternating product showcase with accessible detail modal (Escape / click-outside / scroll-lock)
- Full-screen animated mobile navigation, scroll progress bar, desktop custom cursor
- Design system with `clamp()` responsive typography, `next/font` self-hosted fonts, inline SVG icons (no icon library)
- `prefers-reduced-motion` respected throughout; semantic HTML, skip-link, focus states, ARIA-labelled dialogs
- `next/image` with responsive `sizes`, lazy loading, and priority hero image

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy

```bash
vercel --prod
```

## Structure

Single route (`/`) composed of sections — no unnecessary pages.

```
app/            # App shell, design system CSS, page composition
components/
  layout/       # Header, Footer
  sections/     # Hero, About, Industries, Products, VisionMission, Team, CTA, Contact
  media/        # ProductModal
  motion/       # Reusable Framer Motion primitives
  hooks/        # Shared dialog hooks (scroll-lock, Escape, focus-trap)
  ui/           # Icon, Marquee
  fx/           # CustomCursor, ScrollProgress
data/           # Site + product content (content separated from presentation)
```
