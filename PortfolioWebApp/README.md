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

No new environment variables are required. If present, the following are optionally used at runtime:

SEO
- REACT_APP_FRONTEND_URL (recommended) — Base site URL used to compute the canonical URL and JSON-LD schema
- REACT_APP_API_BASE (fallback) — Used only if REACT_APP_FRONTEND_URL is absent

Analytics (optional; GA4)
- REACT_APP_ANALYTICS_ID — GA4 Measurement ID (e.g., G-XXXXXXX). Analytics only initializes when REACT_APP_NODE_ENV === 'production'.
- REACT_APP_NODE_ENV — Should be 'production' to enable analytics initialization.

Contact Endpoint (optional)
- REACT_APP_CONTACT_ENDPOINT — If set, the Contact form will POST JSON payloads to this endpoint using fetch with debounce and accessible status updates. When absent, the form remains client-only and performs no network calls.

Never include secrets in the client. These variables are non-secret feature toggles only.

## Accessibility

- Semantic regions and headings
- Keyboard focus styles (:focus-visible)
- ARIA where appropriate (progressbar, alerts, current page)
- Color contrast via theming

## Deployment

The app builds to the build/ folder and can be served by any static host (S3, Netlify, Vercel, etc.).

