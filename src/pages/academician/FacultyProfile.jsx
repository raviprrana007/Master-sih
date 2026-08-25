import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../../components/ui/Avatar';
import { MapPin, BookOpen, FlaskConical, Users } from 'lucide-react';

export default function FacultyProfile() {
  const { currentUser } = useAuth();
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Avatar name={currentUser?.name} color={currentUser?.color} size="2xl" />
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: '0 0 4px', fontSize: '1.75rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>{currentUser?.name}</h1>
            <div style={{ fontSize: '1rem', color: '#10B981', marginBottom: 4 }}>{currentUser?.title}</div>
            <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: 8 }}>{currentUser?.department} • {currentUser?.institution}</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
              <span style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: '0.875rem', color: '#64748b' }}><MapPin size={12} />{currentUser?.location}</span>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Experience: {currentUser?.experience}</span>
            </div>
            <p style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>{currentUser?.about}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(currentUser?.skills || []).map(s => <span key={s} style={{ padding: '3px 10px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 500, background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>{s}</span>)}
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          {[{ icon: Users, label: 'Connections', value: currentUser?.connections || 156 },
            { icon: BookOpen, label: 'Publications', value: currentUser?.publications || 23 },
            { icon: FlaskConical, label: 'Research Projects', value: currentUser?.researchProjects || 5 }].map(s => (
            <div key={s.label} className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <s.icon size={20} color="#10B981" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
