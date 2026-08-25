export default function FDPPage() {
  const fdps = [
    { title: 'FDP on Generative AI for Educators', organizer: 'IIT Bombay + Google', duration: '5 days', mode: 'Online', date: '2026-10-10', seats: 100, fee: 'Free' },
    { title: 'Faculty Development in Cloud Computing', organizer: 'AWS Academy', duration: '3 days', mode: 'Hybrid', date: '2026-10-20', seats: 50, fee: '₹500' },
    { title: 'Workshop on Research Methodology', organizer: 'AICTE', duration: '7 days', mode: 'Onsite', date: '2026-11-01', seats: 40, fee: 'Free' },
    { title: 'ML in Engineering Education', organizer: 'NVIDIA + VIT', duration: '4 days', mode: 'Online', date: '2026-11-10', seats: 200, fee: 'Free' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>Faculty Development Programs</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Upskill and stay current with industry and pedagogy trends</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {fdps.map(f => (
          <div key={f.title} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.4 }}>{f.title}</h3>
            <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>{f.organizer}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: '0.8rem', color: '#64748b' }}>
              <span>📅 {f.date}</span><span>⏱ {f.duration}</span>
              <span>📍 {f.mode}</span><span>👥 {f.seats} seats</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: f.fee === 'Free' ? '#10B981' : '#e2e8f0' }}>{f.fee}</span>
              <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.375rem 0.875rem', background: '#10B981' }}>Register</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
