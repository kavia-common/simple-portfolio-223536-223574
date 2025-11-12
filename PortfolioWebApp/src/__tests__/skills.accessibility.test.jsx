import { render, screen, within } from '@testing-library/react';
import App from '../App';

// IntersectionObserver mock safeguard
beforeAll(() => {
  if (!window.IntersectionObserver) {
    class IO {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() { return []; }
    }
    window.IntersectionObserver = IO;
    global.IntersectionObserver = IO;
  }
});

test('Skills progressbars expose correct ARIA attributes', () => {
  render(<App />);

  const section = screen.getByLabelText(/skills/i);
  expect(section).toBeInTheDocument();

  const heading = screen.getByRole('heading', { name: /skills/i, level: 2 });
  expect(heading).toBeInTheDocument();

  // All progressbars with aria-valuenow between 0-100 and have labelledby/ describedby
  const progressbars = within(section).getAllByRole('progressbar');
  expect(progressbars.length).toBeGreaterThan(0);

  progressbars.forEach(pb => {
    const now = Number(pb.getAttribute('aria-valuenow'));
    const min = Number(pb.getAttribute('aria-valuemin'));
    const max = Number(pb.getAttribute('aria-valuemax'));
    expect(min).toBe(0);
    expect(max).toBe(100);
    expect(now).toBeGreaterThanOrEqual(0);
    expect(now).toBeLessThanOrEqual(100);

    const labelledby = pb.getAttribute('aria-labelledby');
    const describedby = pb.getAttribute('aria-describedby');
    expect(labelledby).toBeTruthy();
    expect(describedby).toBeTruthy();

    // The referenced elements should exist
    if (labelledby) {
      const labelEl = document.getElementById(labelledby);
      expect(labelEl).toBeTruthy();
      expect(labelEl.textContent).not.toEqual('');
    }
    if (describedby) {
      const descEl = document.getElementById(describedby);
      expect(descEl).toBeTruthy();
    }
  });
});
