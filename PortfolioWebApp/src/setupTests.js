/* jest-dom adds custom jest matchers for asserting on DOM nodes.
   allows you to do things like:
   expect(element).toHaveTextContent(/react/i)
   learn more: https://github.com/testing-library/jest-dom */
import '@testing-library/jest-dom';

// Provide a robust, no-op IntersectionObserver for jsdom
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class IO {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  }
  window.IntersectionObserver = IO;
  // Also expose globally
  // eslint-disable-next-line no-undef
  global.IntersectionObserver = IO;
}
