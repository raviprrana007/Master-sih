import { WORKSHOPS } from '../../data/collaborations';

export default function WorkshopsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
          Workshops & Events
        </h1>
        <p style={{ margin: 0, color: '#64748b' }}>Upskill through industry-led workshops and tech events</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {WORKSHOPS.map(w => (
          <div key={w.id} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 600, background: `${w.color}15`, color: w.color, border: `1px solid ${w.color}30` }}>
                {w.type}
              </span>
              <span style={{
                padding: '2px 6px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 600,
                background: w.mode === 'Online' ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)',
                color: w.mode === 'Online' ? '#34d399' : '#60a5fa',
                border: `1px solid ${w.mode === 'Online' ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)'}`,
              }}>
                {w.mode}
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>{w.title}</h3>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>by {w.organizer}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Speaker: {w.speaker}</div>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>📅 {w.date}</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>⏱ {w.duration}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>{w.description}</p>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {w.skills.map(s => <span key={s} style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem', background: 'rgba(59,130,246,0.08)', color: '#94a3b8', border: '1px solid rgba(59,130,246,0.15)' }}>{s}</span>)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: w.price.includes('Free') ? '#10B981' : '#e2e8f0' }}>{w.price}</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{w.registered}/{w.seats} spots</span>
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Register Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
