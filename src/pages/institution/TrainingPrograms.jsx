import { useState } from 'react';
import { BookOpen, Users, Clock, Award } from 'lucide-react';

const PROGRAMS = [
  {
    id: 1, title: 'Full Stack Web Development Bootcamp', type: 'Technical', duration: '8 weeks',
    enrolled: 142, capacity: 180, instructor: 'Dr. Rajesh Kumar', partner: 'Google',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'], status: 'Active', startDate: 'Sep 1, 2025',
    completion: 65, color: '#3B82F6',
  },
  {
    id: 2, title: 'Machine Learning Fundamentals', type: 'Technical', duration: '6 weeks',
    enrolled: 98, capacity: 120, instructor: 'Prof. Anita Patel', partner: 'Microsoft',
    skills: ['Python', 'Scikit-learn', 'TensorFlow', 'Statistics'], status: 'Active', startDate: 'Aug 15, 2025',
    completion: 80, color: '#10B981',
  },
  {
    id: 3, title: 'Communication & Leadership Skills', type: 'Soft Skills', duration: '4 weeks',
    enrolled: 220, capacity: 250, instructor: 'Ms. Divya Menon', partner: 'Deloitte',
    skills: ['Communication', 'Leadership', 'Presentation', 'Negotiation'], status: 'Active', startDate: 'Sep 10, 2025',
    completion: 40, color: '#F59E0B',
  },
  {
    id: 4, title: 'Cloud Computing & DevOps', type: 'Technical', duration: '10 weeks',
    enrolled: 76, capacity: 100, instructor: 'Dr. Sanjay Verma', partner: 'Amazon',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'], status: 'Active', startDate: 'Aug 20, 2025',
    completion: 72, color: '#8B5CF6',
  },
  {
    id: 5, title: 'Data Science & Analytics', type: 'Technical', duration: '8 weeks',
    enrolled: 0, capacity: 120, instructor: 'Dr. Kavita Nair', partner: 'Flipkart',
    skills: ['Python', 'Pandas', 'Tableau', 'SQL'], status: 'Upcoming', startDate: 'Oct 1, 2025',
    completion: 0, color: '#06B6D4',
  },
  {
    id: 6, title: 'Entrepreneurship & Startup Essentials', type: 'Business', duration: '5 weeks',
    enrolled: 0, capacity: 80, instructor: 'Mr. Arun Mehta', partner: 'NASSCOM',
    skills: ['Business Planning', 'Pitching', 'Finance', 'Marketing'], status: 'Upcoming', startDate: 'Oct 15, 2025',
    completion: 0, color: '#EF4444',
  },
  {
    id: 7, title: 'Ethical AI & Responsible Technology', type: 'Technical', duration: '3 weeks',
    enrolled: 185, capacity: 200, instructor: 'Dr. Priya Sharma', partner: 'IBM',
    skills: ['AI Ethics', 'Bias Detection', 'Governance', 'Policy'], status: 'Completed', startDate: 'Jul 1, 2025',
    completion: 100, color: '#3B82F6',
  },
];

const STATUS_COLORS = {
  Active: { bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.2)' },
  Upcoming: { bg: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: 'rgba(59,130,246,0.2)' },
  Completed: { bg: 'rgba(100,116,139,0.1)', color: '#94a3b8', border: 'rgba(100,116,139,0.2)' },
};

const TYPE_COLORS = {
  Technical: '#3B82F6',
  'Soft Skills': '#F59E0B',
  Business: '#10B981',
};

export default function TrainingPrograms() {
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const types = ['All', 'Technical', 'Soft Skills', 'Business'];
  const statuses = ['All', 'Active', 'Upcoming', 'Completed'];

  const filtered = PROGRAMS.filter(p => {
    const matchType = typeFilter === 'All' || p.type === typeFilter;
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchType && matchStatus;
  });

  const totalEnrolled = PROGRAMS.filter(p => p.status === 'Active').reduce((a, p) => a + p.enrolled, 0);
  const activeCount = PROGRAMS.filter(p => p.status === 'Active').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>Training Programs</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Manage upskilling initiatives for students</p>
        </div>
        <button className="btn-primary" style={{ background: '#3B82F6' }}>+ New Program</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {[
          { label: 'Total Programs', value: PROGRAMS.length, icon: BookOpen, color: '#3B82F6' },
          { label: 'Active Programs', value: activeCount, icon: Award, color: '#10B981' },
          { label: 'Total Enrolled', value: totalEnrolled, icon: Users, color: '#F59E0B' },
          { label: 'Avg Duration', value: '6.3 wks', icon: Clock, color: '#8B5CF6' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '1.25rem', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: s.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <s.icon size={18} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {types.map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            style={{
              padding: '6px 14px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
              background: typeFilter === t ? '#3B82F6' : 'transparent',
              color: typeFilter === t ? 'white' : '#94a3b8',
              border: `1px solid ${typeFilter === t ? '#3B82F6' : '#1e293b'}`,
            }}
          >
            {t}
          </button>
        ))}
        <div style={{ width: 1, background: '#1e293b', margin: '0 4px' }} />
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              padding: '6px 14px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
              background: statusFilter === s ? '#10B981' : 'transparent',
              color: statusFilter === s ? 'white' : '#94a3b8',
              border: `1px solid ${statusFilter === s ? '#10B981' : '#1e293b'}`,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Program cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1rem' }}>
        {filtered.map(p => {
          const sc = STATUS_COLORS[p.status];
          const tc = TYPE_COLORS[p.type] || '#64748b';
          return (
            <div key={p.id} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ padding: '1px 7px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 600, background: tc + '22', color: tc, border: `1px solid ${tc}44` }}>{p.type}</span>
                    <span style={{ padding: '1px 7px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 600, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>{p.status}</span>
                  </div>
                  <h3 style={{ margin: '0 0 2px', fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.3 }}>{p.title}</h3>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 4 }}>
                👤 {p.instructor} · 🤝 {p.partner}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 10 }}>
                📅 {p.startDate} · ⏱ {p.duration}
              </div>

              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
                {p.skills.map(s => (
                  <span key={s} style={{ padding: '1px 7px', borderRadius: 4, fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid #1e293b' }}>{s}</span>
                ))}
              </div>

              {p.status !== 'Upcoming' && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Progress</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: p.color }}>{p.completion}%</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)' }}>
                    <div style={{ height: '100%', width: `${p.completion}%`, borderRadius: 2, background: p.color }} />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{p.enrolled}</span>/{p.capacity} enrolled
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>View</button>
                  {p.status === 'Upcoming' && <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '4px 10px', background: '#3B82F6' }}>Manage</button>}
                  {p.status === 'Active' && <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '4px 10px', background: '#10B981' }}>Monitor</button>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
