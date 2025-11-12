import React, { useCallback, useMemo, useRef, useState } from 'react';
import '../styles/variables.css';

const initial = { name: '', email: '', message: '' };

/**
 * Debounce utility for stable submits.
 * @param {Function} fn
 * @param {number} delay
 */
function debounce(fn, delay = 600) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

/**
 * PUBLIC_INTERFACE
 * Contact form with UI-only validation by default.
 * If REACT_APP_CONTACT_ENDPOINT is defined, attempts to POST the form with debounce and accessible live status.
 */
function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const endpoint = typeof process !== 'undefined' ? process.env.REACT_APP_CONTACT_ENDPOINT : undefined;
  const isSubmittingRef = useRef(false);

  const validate = (data) => {
    const e = {};
    if (!data.name.trim()) e.name = 'Name is required.';
    if (!data.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email.';
    if (!data.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const postForm = useCallback(async (payload) => {
    if (!endpoint) return; // should not be called when undefined
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(id);
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      return await res.json().catch(() => ({}));
    } catch (err) {
      throw err;
    }
  }, [endpoint]);

  const debouncedSubmit = useMemo(() => debounce(async (payload) => {
    try {
      setStatus({ type: 'loading', message: 'Sending…' });
      await postForm(payload);
      setStatus({ type: 'success', message: 'Message sent successfully.' });
      setForm(initial);
    } catch {
      setStatus({ type: 'error', message: 'Sorry, something went wrong. Please try again later.' });
    } finally {
      isSubmittingRef.current = false;
    }
  }, 700), [postForm]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length !== 0) return;

    // If no endpoint, preserve previous no-network UX
    if (!endpoint) {
      alert('Thanks! This demo form does not submit anywhere.');
      setForm(initial);
      return;
    }

    // Prevent duplicate submissions while in-flight
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    debouncedSubmit({ ...form });
  };

  return (
    <section id="contact" tabIndex={-1} className="section" aria-label="Contact">
      <div className="container maxw-720">
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">Have a question or want to work together?</p>

        <form onSubmit={onSubmit} noValidate aria-describedby="contactHelp" className="card card-padding">
          <p id="contactHelp" className="visually-hidden">
            All fields are required. {endpoint ? 'A request will be sent to the server when you submit.' : 'This form does not submit data.'}
          </p>

          <div className="form-grid">
            <label>
              <span className="inline-label">Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e)=> setForm(f => ({...f, name: e.target.value}))}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`input-base ${errors.name ? 'input-error' : ''}`}
                autoComplete="name"
              />
              {errors.name && <span id="name-error" role="alert" className="error-text">{errors.name}</span>}
            </label>

            <label>
              <span className="inline-label">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e)=> setForm(f => ({...f, email: e.target.value}))}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`input-base ${errors.email ? 'input-error' : ''}`}
                autoComplete="email"
              />
              {errors.email && <span id="email-error" role="alert" className="error-text">{errors.email}</span>}
            </label>

            <label>
              <span className="inline-label">Message</span>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={(e)=> setForm(f => ({...f, message: e.target.value}))}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`input-base textarea-resize ${errors.message ? 'input-error' : ''}`}
              />
              {errors.message && <span id="message-error" role="alert" className="error-text">{errors.message}</span>}
            </label>

            <div>
              <button type="submit" className="btn" data-testid="contact-submit" disabled={status.type === 'loading'}>
                {status.type === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
            </div>

            <div aria-live="polite" aria-atomic="true" className="visually-hidden" data-testid="contact-status">
              {status.message}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default React.memo(Contact);
