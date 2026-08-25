import { Avatar } from '../../components/ui/Avatar';

const MENTEES = [
  { name: 'Ravi Prakash Rana', institution: 'KIIT University', year: '3rd Year', area: 'Full Stack Development', color: '#3B82F6', progress: 72, sessions: 4 },
  { name: 'Preet Sharma', institution: 'KIIT University', year: '2nd Year', area: 'Machine Learning', color: '#8B5CF6', progress: 58, sessions: 6 },
  { name: 'Aisha Khan', institution: 'KIIT University', year: '3rd Year', area: 'Data Science', color: '#10B981', progress: 84, sessions: 8 },
];

export default function AcademicianMentorship() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>Mentorship</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Guide students on their academic and professional journey</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {MENTEES.map(m => (
          <div key={m.name} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: '0.875rem' }}>
              <Avatar name={m.name} color={m.color} size="md" />
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{m.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.institution} • {m.year}</div>
                <div style={{ fontSize: '0.75rem', color: m.color }}>Focus: {m.area}</div>
              </div>
            </div>
            <div style={{ marginBottom: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Progress</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: m.color }}>{m.progress}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)' }}>
                <div style={{ height: '100%', width: `${m.progress}%`, borderRadius: 3, background: m.color }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.sessions} sessions completed</span>
              <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.375rem 0.875rem', background: '#10B981' }}>Schedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
