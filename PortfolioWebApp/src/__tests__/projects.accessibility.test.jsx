import { render, screen, within } from '@testing-library/react';
import App from '../App';

// Provide IntersectionObserver mock as some components set it up in Navbar
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

test('Projects section has heading and images with descriptive alt text', async () => {
  render(<App />);

  const section = screen.getByRole('region', { name: /projects/i }) || screen.getByLabelText(/projects/i);
  // Fallback for label query since section uses aria-label
  expect(section).toBeInTheDocument();

  const heading = screen.getByRole('heading', { name: /projects/i, level: 2 });
  expect(heading).toBeInTheDocument();

  // Find project articles and their images
  const articles = within(section).getAllByRole('article');
  expect(articles.length).toBeGreaterThan(0);

  // Each article should have an img with alt containing "project preview image"
  const imgs = within(section).getAllByRole('img');
  expect(imgs.length).toBeGreaterThan(0);
  imgs.forEach(img => {
    const alt = img.getAttribute('alt') || '';
    expect(alt.toLowerCase()).toContain('project preview image');
  });

  // Buttons/links have accessible names
  const demoLinks = screen.getAllByRole('link', { name: /open demo/i });
  demoLinks.forEach(a => expect(a).toHaveAttribute('href'));

  const sourceLinks = screen.getAllByRole('link', { name: /open source code/i });
  sourceLinks.forEach(a => expect(a).toHaveAttribute('href'));
});
