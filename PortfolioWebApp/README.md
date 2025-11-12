# PortfolioWebApp (React SPA)

A clean, accessible, mobile‑first portfolio SPA with sections: Intro, Skills, Projects, and Contact. Optimized for static hosting with no backend dependencies.

## Features

- SPA with smooth-scroll anchor navigation and active link highlight
- Light/Dark mode with CSS variables; persisted in localStorage
- Responsive, accessible components (ARIA, keyboard focus styles)
- SEO metadata: document title, description, optional canonical
- Projects with lazy-loaded images and tech tags
- Contact form with client-side validation only (no network calls)
- Minimal tests via React Testing Library

## Getting Started

From the PortfolioWebApp directory:

- npm start — start development server
- npm test — run unit tests
- npm run build — build static production assets

Open http://localhost:3000 after starting.

## Structure

- src/components/ — Navbar, ThemeToggle, Hero, Skills, Projects, Contact, Footer
- src/data/ — static data for projects and skills
- src/styles/variables.css — theme tokens and base styles
- src/__tests__/ — basic tests (navbar, theme toggle, contact validation)

## Environment

No new environment variables are introduced. If present, the following are optionally used:
- REACT_APP_FRONTEND_URL (for canonical/title context)
- REACT_APP_API_BASE (fallback for canonical)

Never include secrets in the client.

## Accessibility

- Semantic regions and headings
- Keyboard focus styles (:focus-visible)
- ARIA where appropriate (progressbar, alerts, current page)
- Color contrast via theming

## Deployment

The app builds to the build/ folder and can be served by any static host (S3, Netlify, Vercel, etc.).

