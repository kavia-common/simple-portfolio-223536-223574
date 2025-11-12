//
// PUBLIC_INTERFACE
// Analytics utility with safe, optional Google Analytics initialization.
//
// Behavior:
// - Initializes GA4 (gtag.js) ONLY if both REACT_APP_ANALYTICS_ID is set
//   AND REACT_APP_NODE_ENV === 'production'.
// - Exposes no-op functions when disabled.
// - Avoids throwing in non-browser environments.
//
// Security: Never logs or includes secrets. Uses only public env flags.
//
// Usage:
//   import { initAnalytics, trackEvent, trackPageview, isAnalyticsEnabled } from './utils/analytics';
//   initAnalytics(); // safe to call multiple times
//   trackEvent('cta_click', { label: 'contact' });
//   trackPageview(window.location.pathname);
//
// Environment variables (injected at build/runtime by orchestrator):
// - REACT_APP_ANALYTICS_ID (optional): GA4 Measurement ID (e.g., G-XXXX...)
// - REACT_APP_NODE_ENV (optional): should be 'production' to enable analytics
//

const ANALYTICS_ID = typeof process !== 'undefined' ? process.env.REACT_APP_ANALYTICS_ID : undefined;
const NODE_ENV = typeof process !== 'undefined' ? process.env.REACT_APP_NODE_ENV : undefined;

let initialized = false;

/**
 * Determine if analytics should be enabled based on env.
 * @returns {boolean}
 */
export function isAnalyticsEnabled() {
  return Boolean(ANALYTICS_ID && NODE_ENV === 'production');
}

/**
 * PUBLIC_INTERFACE
 * Initialize Google Analytics (gtag) if enabled by env flags.
 * Safe to call repeatedly; will no-op if already initialized or not enabled.
 */
export function initAnalytics() {
  if (!isBrowser() || !isAnalyticsEnabled() || initialized) return;
  try {
    // Create dataLayer if missing
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    // Attach to window so other modules can use it
    window.gtag = window.gtag || gtag;

    // Inject gtag script tag
    const existing = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id="]`);
    if (!existing) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ANALYTICS_ID)}`;
      s.setAttribute('data-origin', 'portfolio-analytics');
      document.head.appendChild(s);
    }

    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_ID, {
      anonymize_ip: true,
      send_page_view: false, // we control pageview manually for SPA
    });

    initialized = true;
  } catch {
    // Silently ignore; analytics is best-effort
  }
}

/**
 * PUBLIC_INTERFACE
 * Track a pageview if analytics is enabled.
 * @param {string} path - URL path (e.g., "/projects")
 */
export function trackPageview(path) {
  if (!isBrowser() || !isAnalyticsEnabled() || !window.gtag) return;
  try {
    window.gtag('event', 'page_view', {
      page_path: path || window.location.pathname,
    });
  } catch {
    // ignore
  }
}

/**
 * PUBLIC_INTERFACE
 * Track a custom event if analytics is enabled.
 * @param {string} action - event name (e.g., 'contact_submit')
 * @param {Record<string, any>} params - additional properties
 */
export function trackEvent(action, params = {}) {
  if (!isBrowser() || !isAnalyticsEnabled() || !window.gtag) return;
  try {
    window.gtag('event', action, params);
  } catch {
    // ignore
  }
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
