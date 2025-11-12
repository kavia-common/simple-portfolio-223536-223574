import React, { useState } from 'react';
import '../styles/variables.css';

const initial = { name: '', email: '', message: '' };

/**
 * PUBLIC_INTERFACE
 * Contact form with UI-only validation (no network calls).
 */
function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const e = {};
    if (!data.name.trim()) e.name = 'Name is required.';
    if (!data.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email.';
    if (!data.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length === 0) {
      // simulate success UI only
      alert('Thanks! This demo form does not submit anywhere.');
      setForm(initial);
    }
  };

  return (
    <section id="contact" tabIndex={-1} className="section" aria-label="Contact">
      <div className="container" style={{maxWidth:720}}>
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">Have a question or want to work together?</p>

        <form onSubmit={onSubmit} noValidate aria-describedby="contactHelp" className="card" style={{padding:16}}>
          <p id="contactHelp" className="visually-hidden">All fields are required. This form does not submit data.</p>

          <div style={{display:'grid', gap:12}}>
            <label>
              <span style={{display:'inline-block', marginBottom:6}}>Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e)=> setForm(f => ({...f, name: e.target.value}))}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                style={{
                  width:'100%', padding:'10px 12px', borderRadius:10,
                  border:`1px solid ${errors.name ? 'crimson':'var(--color-border)'}`,
                  background:'var(--color-bg)', color:'var(--color-text)'
                }}
              />
              {errors.name && <span id="name-error" role="alert" style={{color:'crimson', fontSize:12}}>{errors.name}</span>}
            </label>

            <label>
              <span style={{display:'inline-block', marginBottom:6}}>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e)=> setForm(f => ({...f, email: e.target.value}))}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                style={{
                  width:'100%', padding:'10px 12px', borderRadius:10,
                  border:`1px solid ${errors.email ? 'crimson':'var(--color-border)'}`,
                  background:'var(--color-bg)', color:'var(--color-text)'
                }}
              />
              {errors.email && <span id="email-error" role="alert" style={{color:'crimson', fontSize:12}}>{errors.email}</span>}
            </label>

            <label>
              <span style={{display:'inline-block', marginBottom:6}}>Message</span>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={(e)=> setForm(f => ({...f, message: e.target.value}))}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                style={{
                  width:'100%', padding:'10px 12px', borderRadius:10,
                  border:`1px solid ${errors.message ? 'crimson':'var(--color-border)'}`,
                  background:'var(--color-bg)', color:'var(--color-text)', resize:'vertical'
                }}
              />
              {errors.message && <span id="message-error" role="alert" style={{color:'crimson', fontSize:12}}>{errors.message}</span>}
            </label>

            <div>
              <button type="submit" className="btn" data-testid="contact-submit">Send Message</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default React.memo(Contact);
