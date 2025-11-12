import { render } from '@testing-library/react';
import App from '../App';

function cleanupHead() {
  document.head.querySelectorAll('link[rel="canonical"]').forEach(n => n.remove());
  document.head.querySelectorAll('meta[name="description"]').forEach(n => n.remove());
  document.head.querySelectorAll('meta[property="og:url"]').forEach(n => n.remove());
  const ld = document.getElementById('portfolio-jsonld-person');
  if (ld) ld.remove();
}

describe('SEO defaults', () => {
  beforeEach(() => {
    cleanupHead();
    // Reset location to a deterministic path
    const url = new URL('https://test.example/path?x=1#hash');
    delete window.location;
    // Define minimal location object
    window.location = {
      href: url.toString(),
      origin: url.origin,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash
    };
  });

  afterEach(() => {
    cleanupHead();
  });

  test('sets meta description if missing and canonical from FRONTEND_URL', () => {
    const prevFE = process.env.REACT_APP_FRONTEND_URL;
    const prevAPI = process.env.REACT_APP_API_BASE;
    process.env.REACT_APP_FRONTEND_URL = 'https://portfolio.example.com';
    delete process.env.REACT_APP_API_BASE;

    render(<App />);

    // Meta description gets created in App effect if missing
    const metaDesc = document.head.querySelector('meta[name="description"]');
    expect(metaDesc).toBeTruthy();
    expect(metaDesc.getAttribute('content')).toMatch(/alex doe/i);

    // Canonical link should be set using FRONTEND_URL + current path/search/hash
    const canonical = document.head.querySelector('link[rel="canonical"]');
    expect(canonical).toBeTruthy();
    expect(canonical.getAttribute('href'))
      .toBe('https://portfolio.example.com/path?x=1#hash');

    // og:url mirrors canonical
    const ogUrl = document.head.querySelector('meta[property="og:url"]');
    expect(ogUrl).toBeTruthy();
    expect(ogUrl.getAttribute('content'))
      .toBe('https://portfolio.example.com/path?x=1#hash');

    // JSON-LD script injected
    const jsonld = document.getElementById('portfolio-jsonld-person');
    expect(jsonld).toBeTruthy();
    const parsed = JSON.parse(jsonld.textContent || '{}');
    expect(parsed['@type']).toBe('Person');
    expect(parsed.name).toMatch(/alex doe/i);

    // Restore env
    process.env.REACT_APP_FRONTEND_URL = prevFE;
    process.env.REACT_APP_API_BASE = prevAPI;
  });

  test('falls back to API_BASE when FRONTEND_URL is not set', () => {
    const prevFE = process.env.REACT_APP_FRONTEND_URL;
    const prevAPI = process.env.REACT_APP_API_BASE;
    delete process.env.REACT_APP_FRONTEND_URL;
    process.env.REACT_APP_API_BASE = 'https://api.example.com';

    render(<App />);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    expect(canonical).toBeTruthy();
    expect(canonical.getAttribute('href'))
      .toBe('https://api.example.com/path?x=1#hash');

    process.env.REACT_APP_FRONTEND_URL = prevFE;
    process.env.REACT_APP_API_BASE = prevAPI;
  });
});
