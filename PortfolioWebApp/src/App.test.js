import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main sections', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Hi, I’m Alex Doe/i})).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Skills/i})).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Projects/i})).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Contact/i})).toBeInTheDocument();
});
