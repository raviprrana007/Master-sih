import { COMPANIES } from '../../data/companies';

export default function TalentNetwork() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>Talent Network</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Connected students and alumni in your talent pool</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {['KIIT University', 'IIT Bombay', 'NIT Trichy', 'BITS Pilani', 'VIT Vellore', 'Anna University'].map((inst, i) => (
          <div key={inst} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>🏫</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>{inst}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 8 }}>{[45, 23, 18, 34, 29, 15][i]} students connected</div>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>View Pool</button>
          </div>
        ))}
      </div>
    </div>
  );
}
