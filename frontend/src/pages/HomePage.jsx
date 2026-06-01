export default function HomePage({ onFindCar }) {
  return (
    <div className="home-page">
      <div className="logo">
        <div className="logo-icon">🚗</div>
        <span>DreamCar</span>
      </div>
      
      <div className="home-header">
        <h1>Stop guessing. Start shortlisting.</h1>
        <p>Too many makes, models and trims? Tell us about your budget and your life.</p>
        <p style={{ marginTop: '16px', fontSize: '14px', fontStyle: 'italic', color: '#999' }}>
          We'll rank the cars that actually fit — and show you exactly why.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
        <button className="btn-primary" onClick={onFindCar}>
          Find my car →
        </button>
        <button className="btn-secondary">
          View my shortlist
        </button>
      </div>

      <p style={{ marginTop: '40px', fontSize: '14px', color: '#999' }}>
        16 researched models · 6 body types · takes about 90 seconds
      </p>
    </div>
  );
}
