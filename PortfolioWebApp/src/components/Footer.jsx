import React from 'react';
import '../styles/variables.css';

/**
 * PUBLIC_INTERFACE
 * Footer with basic meta links.
 */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer role="contentinfo" className="section" style={{paddingTop:24, paddingBottom:24, borderTop:'1px solid var(--color-border)'}}>
      <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12}}>
        <span>&copy; {year} Alex Doe</span>
        <div style={{display:'flex', gap:12}}>
          <a className="btn secondary" href="#home">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
