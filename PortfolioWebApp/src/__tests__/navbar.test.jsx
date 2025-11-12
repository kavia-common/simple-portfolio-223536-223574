import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders navbar links', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /skills/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
});
