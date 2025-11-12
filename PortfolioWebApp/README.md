# PortfolioWebApp (React SPA)

A clean, accessible, mobile‑first portfolio SPA with sections: Intro, Skills, Projects, and Contact. Optimized for static hosting with no backend dependencies.

## Features

- SPA with smooth-scroll anchor navigation and active link highlight
- Light/Dark mode with CSS variables; persisted in localStorage
- Responsive, accessible components (ARIA, keyboard focus styles)
- SEO metadata: document title, description, canonical, JSON-LD Person
- Projects with lazy-loaded images and tech tags
- Contact form with client-side validation by default; optional POST endpoint
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
- src/__tests__/ — tests (navbar, theme toggle, contact validation, accessibility, SEO)
- src/utils/seo.js — runtime canonical + JSON-LD injection
- src/utils/analytics.js — safe optional GA initialization

## Environment configuration

This app does not require environment variables to run locally. However, you can optionally configure the following non-secret variables to enable SEO/analytics and an external contact endpoint.

1) Copy the example file and edit as needed:
- cp .env.example .env

2) Available variables and when to set them:
- REACT_APP_FRONTEND_URL (recommended)
  Purpose: Base site URL used to compute canonical URL and JSON-LD schema (seo.js).
  When: In all deployed environments (production/staging) where you have a public site URL, e.g. https://portfolio.example.com.

- REACT_APP_API_BASE (fallback)
  Purpose: Only used to build canonical when FRONTEND_URL is absent.
  When: Optional; set only if you don’t have FRONTEND_URL configured.

- REACT_APP_ANALYTICS_ID (optional)
  Purpose: Google Analytics 4 Measurement ID (e.g., G-XXXXXXXX). Analytics only initializes when REACT_APP_NODE_ENV === "production".
  When: Production sites that need GA. Leave unset for local/dev.

- REACT_APP_NODE_ENV (optional)
  Purpose: Controls analytics gating in the client (separate from NODE_ENV). Must be "production" to allow analytics initialization.
  When: Set to production for your production build if you want analytics enabled. For dev, keep at development.

- REACT_APP_CONTACT_ENDPOINT (optional)
  Purpose: If set, Contact form will POST JSON {name,email,message} to this URL (with debounce and aria-live updates).
  When: If you have a backend service to receive contact messages. If not set, the form stays client-only (demo mode).

Security note: Never put secrets or API keys intended to be private into REACT_APP_* variables; they are embedded in client code.

## Accessibility checklist

Use this checklist before shipping:
- Landmarks and headings
  - [x] Main content is wrapped in <main> and sections use semantic regions with aria-labels.
  - [x] Headings form a logical outline (h1 -> h2 -> h3…).

- Keyboard and focus
  - [x] Skip link is present and becomes visible on focus.
  - [x] All interactive elements are keyboard reachable in a sensible order.
  - [x] :focus-visible styles are clearly visible and meet contrast guidelines.

- ARIA usage
  - [x] aria-current for active nav link; menubar/menuitem roles for navigation list.
  - [x] Progress bars expose aria-valuenow/min/max with labels/descriptions.
  - [x] Contact form validation errors use role="alert".
  - [x] Live regions (aria-live="polite") communicate async status.

- Color and contrast
  - [x] Light/Dark themes meet minimum contrast ratios.
  - [x] No information conveyed by color alone.

- Motion and performance
  - [x] Avoid layout shifts; images have stable containers and lazy loading.
  - [x] No essential information relies solely on animations.

## SEO guidance

This app sets document title/description in App.js and uses utils/seo.js for canonical and JSON-LD.

- Canonical URLs
  - The canonical link is constructed from REACT_APP_FRONTEND_URL (preferred) or REACT_APP_API_BASE (fallback) plus the current path/query/hash.
  - Always set REACT_APP_FRONTEND_URL in production to ensure correct canonical tags.

- Open Graph/Twitter tags
  - og:url is synchronized with the canonical href at runtime.
  - You can add additional static tags (og:title, og:description, twitter:card) in public/index.html or inject them similarly to seo.js if you need dynamic behavior.

- JSON-LD
  - A Person schema is injected with id portfolio-jsonld-person, including name, url, and optional fields.
  - Update utils/seo.js to customize sameAs/jobTitle/description if desired.

- Canonical handling in multi-env
  - In staging or preview environments, set REACT_APP_FRONTEND_URL to the preview URL so OG/canonical reflect that environment.

## CI workflow overview and local testing

- CI runs automated lint/tests similar to local: npm ci && npm test
- Run tests locally in non-interactive mode to mimic CI:
  - CI=true npm test
  - The CI=true flag ensures tests run once and exit.

- Target test coverage
  - Aim for ≥ 80% unit test coverage across core components and utilities (Navbar, ThemeToggle, Contact validation, SEO helpers).
  - Add tests under src/__tests__/ and run locally before pushing.

Tip: To view coverage with CRA, you can run:
- CI=true npm test -- --coverage

## Deployment

The app builds to the build/ folder and can be served by any static host (S3, Netlify, Vercel, etc.).

- Ensure REACT_APP_FRONTEND_URL is set for production deployments for correct canonical and JSON-LD.
- If using analytics, set both REACT_APP_ANALYTICS_ID and REACT_APP_NODE_ENV=production.

