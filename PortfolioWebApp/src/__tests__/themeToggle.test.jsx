import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('dark mode toggle toggles theme', () => {
  render(<App />);
  const btn = screen.getByTestId('theme-toggle');
  const initial = document.documentElement.getAttribute('data-theme');
  fireEvent.click(btn);
  const after = document.documentElement.getAttribute('data-theme');
  expect(after).not.toBe(initial);
});
