import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('contact form shows validation errors', () => {
  render(<App />);
  const submit = screen.getByTestId('contact-submit');
  // ensure in viewport; click triggers validation
  fireEvent.click(submit);
  expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  expect(screen.getByText(/message is required/i)).toBeInTheDocument();
});
