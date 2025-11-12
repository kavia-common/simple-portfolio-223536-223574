import React, { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * ThemeToggle switches between light/dark modes and persists preference.
 */
function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme-preference');
      if (saved) return saved;
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme-preference', theme); } catch { /* ignore */ }
  }, [theme]);

  return (
    <button
      className="btn secondary"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
      data-testid="theme-toggle"
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

export default React.memo(ThemeToggle);
