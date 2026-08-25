export default function FacultyInternships() {
  const opportunities = [
    { title: 'Industry Research Fellow', company: 'Google DeepMind', stipend: '₹1.5L/month', duration: '3 months', area: 'AI Safety', deadline: '2026-10-15' },
    { title: 'Faculty Industrial Trainee', company: 'Microsoft Research', stipend: '₹80,000/month', duration: '2 months', area: 'Distributed Systems', deadline: '2026-10-30' },
    { title: 'Academic Industry Liaison', company: 'IBM Research', stipend: '₹60,000/month', duration: '6 months', area: 'Quantum Computing', deadline: '2026-11-05' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>Faculty Internships</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Industry research and collaboration opportunities for faculty</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {opportunities.map(o => (
          <div key={o.title} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>{o.title}</h3>
            <div style={{ fontSize: '0.875rem', color: '#10B981', fontWeight: 600 }}>{o.company}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Stipend: <span style={{ color: '#10B981' }}>{o.stipend}</span></div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Duration: {o.duration}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Area: {o.area}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Deadline: {o.deadline}</div>
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#10B981' }}>Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
