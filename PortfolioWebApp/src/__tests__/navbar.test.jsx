import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders navbar links', () => {
  render(<App />);
  expect(screen.getByRole('menuitem', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: /skills/i })).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: /contact/i })).toBeInTheDocument();
});
