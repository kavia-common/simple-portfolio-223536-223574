import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Contact form aria-live behavior without endpoint', () => {
  const originalAlert = window.alert;

  beforeEach(() => {
    // Ensure endpoint is undefined
    delete process.env.REACT_APP_CONTACT_ENDPOINT;
    // Mock alert to avoid dialog in tests
    window.alert = jest.fn();
  });

  afterEach(() => {
    window.alert = originalAlert;
  });

  test('submitting valid form without endpoint shows demo alert and updates polite live region', () => {
    render(<App />);

    const name = screen.getByLabelText(/name/i);
    const email = screen.getByLabelText(/email/i);
    const message = screen.getByLabelText(/message/i);
    const submit = screen.getByTestId('contact-submit');

    // Fill valid values
    fireEvent.change(name, { target: { value: 'Alex' } });
    fireEvent.change(email, { target: { value: 'alex@example.com' } });
    fireEvent.change(message, { target: { value: 'Hello there' } });

    fireEvent.click(submit);

    // No network call expected; alert called in demo mode
    expect(window.alert).toHaveBeenCalled();

    // The aria-live region exists and should be polite/atomic
    const live = screen.getByTestId('contact-status');
    expect(live).toHaveAttribute('aria-live', 'polite');
    expect(live).toHaveAttribute('aria-atomic', 'true');

    // In demo mode, status message remains empty after alert-based flow
    // but the region is present; ensure it does not show an error/success text.
    expect(live.textContent).toBe('');
  });
});
