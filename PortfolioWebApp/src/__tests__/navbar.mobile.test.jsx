import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Robust IntersectionObserver mock to avoid flakiness across tests
beforeAll(() => {
  class IO {
    constructor(cb, options) {
      this.cb = cb;
      this.options = options;
      this.elements = new Set();
    }
    observe = (el) => {
      this.elements.add(el);
      // Immediately call callback with isIntersecting=false to be deterministic
      this.cb([{ target: el, isIntersecting: false }], this);
    };
    unobserve = (el) => this.elements.delete(el);
    disconnect = () => { this.elements.clear(); };
    takeRecords = () => [];
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IO
  });
  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IO
  });
});

describe('Navbar mobile menu behavior', () => {
  test('aria-expanded toggles and menu visibility changes', () => {
    render(<App />);

    // The button toggles the mobile menu
    const menuBtn = screen.getByRole('button', { name: /toggle navigation menu/i });
    const menuList = screen.getByRole('menubar');

    // Initially collapsed
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
    // On desktop CSS, it is visible; but structure includes class toggling "open".
    expect(menuList.className).not.toMatch(/\bopen\b/);

    // Click to open
    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
    expect(menuList.className).toMatch(/\bopen\b/);

    // Click to close
    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
    expect(menuList.className).not.toMatch(/\bopen\b/);
  });

  test('clicking a nav link closes the menu', () => {
    render(<App />);

    const menuBtn = screen.getByRole('button', { name: /toggle navigation menu/i });
    fireEvent.click(menuBtn);

    const projectsLink = screen.getByRole('menuitem', { name: /projects/i });
    const menuList = screen.getByRole('menubar');

    // Ensure opened before clicking link
    expect(menuList.className).toMatch(/\bopen\b/);

    // Click a nav link
    fireEvent.click(projectsLink);

    // Menu should be closed
    expect(menuList.className).not.toMatch(/\bopen\b/);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
  });
});
