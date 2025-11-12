//
// PUBLIC_INTERFACE
// setSeoDefaults dynamically manages canonical link and JSON-LD Person schema.
//
// This module sets or updates:
// - Canonical link: derived from REACT_APP_FRONTEND_URL (or REACT_APP_API_BASE) with a path of current location
// - JSON-LD Person schema: basic identity information for the portfolio owner
//
// Environment variables required (provided by orchestrator via .env):
// - REACT_APP_FRONTEND_URL (recommended): Base site URL (e.g., https://example.com)
// - REACT_APP_API_BASE (fallback): Used only if FRONTEND is absent
//
// Security note: Never include secrets in client code.
//
/**
 * PUBLIC_INTERFACE
 * setSeoDefaults applies runtime SEO elements like canonical link and JSON-LD Person schema.
 * It reads REACT_APP_FRONTEND_URL (or REACT_APP_API_BASE as fallback) and appends current pathname.
 *
 * @returns {void}
 */
export function setSeoDefaults() {
  try {
    const base =
      process.env.REACT_APP_FRONTEND_URL || process.env.REACT_APP_API_BASE || "";

    // Update canonical link if we have a base
    if (base) {
      const canonicalHref = buildCanonicalHref(base, window.location.pathname + window.location.search + window.location.hash);
      const link =
        document.querySelector('link[rel="canonical"]') ||
        document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", canonicalHref);
      if (!document.head.contains(link)) {
        document.head.appendChild(link);
      }
      // Also set og:url to canonical for consistency
      setOrUpdateMeta("property", "og:url", canonicalHref);
    }

    // Inject/update JSON-LD Person schema
    const jsonLd = buildPersonJsonLd({
      name: "Alex Doe",
      url: base ? safeUrl(base) : window.location.origin,
      sameAs: [
        // Replace with real profiles or leave empty strings out
      ],
      jobTitle: "Frontend Engineer",
      description:
        "Frontend Engineer crafting accessible, high-performance web experiences.",
    });

    const scriptId = "portfolio-jsonld-person";
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  } catch {
    // Best-effort; avoid breaking the app if DOM is unavailable
  }
}

/**
 * Build a canonical href ensuring valid absolute URL, preserving the path.
 * @param {string} base
 * @param {string} path
 * @returns {string}
 */
function buildCanonicalHref(base, path) {
  try {
    const origin = safeUrl(base);
    // Use URL constructor to resolve the path against origin
    const u = new URL(path || "/", origin);
    return u.toString();
  } catch {
    // Fallback: current location href
    return window.location.href;
  }
}

/**
 * Normalize a base URL to an absolute origin string.
 * Ensures http(s) scheme when omitted.
 * @param {string} urlLike
 * @returns {string}
 */
function safeUrl(urlLike) {
  try {
    const hasScheme = /^https?:\/\//i.test(urlLike);
    const candidate = hasScheme ? urlLike : `https://${urlLike}`;
    const u = new URL(candidate);
    // return origin (protocol + host + optional port)
    return u.origin + (u.pathname && u.pathname !== "/" ? u.pathname.replace(/\/+$/, "") : "");
  } catch {
    return window.location.origin;
  }
}

/**
 * Ensure a meta tag with given attrName/attrValue exists and set its content.
 * Creates it if missing.
 * @param {"name"|"property"} attrName
 * @param {string} attrValue
 * @param {string} content
 */
function setOrUpdateMeta(attrName, attrValue, content) {
  try {
    let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attrName, attrValue);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  } catch {
    // ignore
  }
}

/**
 * Build JSON-LD Person schema.
 * @param {{name:string, url:string, sameAs?:string[], jobTitle?:string, description?:string}} params
 */
function buildPersonJsonLd(params) {
  const sameAs = Array.isArray(params.sameAs)
    ? params.sameAs.filter(Boolean)
    : [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: params.name,
    url: params.url,
  };
  if (sameAs.length) schema.sameAs = sameAs;
  if (params.jobTitle) schema.jobTitle = params.jobTitle;
  if (params.description) schema.description = params.description;
  return schema;
}
