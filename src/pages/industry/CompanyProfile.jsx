import { useAuth } from '../../context/AuthContext';
import { MapPin, Users, Briefcase, Globe } from 'lucide-react';

export default function CompanyProfile() {
  const { currentUser } = useAuth();
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>Company Profile</h1>
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 80, height: 80, borderRadius: 16, background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: '#06B6D4' }}>T</div>
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>{currentUser?.company}</h2>
            <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: 8 }}>{currentUser?.industry} • {currentUser?.companySize} employees</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: '0.875rem', color: '#64748b' }}><MapPin size={12} />{currentUser?.location}</span>
              <span style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: '0.875rem', color: '#64748b' }}><Globe size={12} />technova.io</span>
            </div>
          </div>
        </div>
        <p style={{ margin: '0 0 1.5rem', fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>{currentUser?.about}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[{ icon: Briefcase, label: 'Open Positions', value: currentUser?.openPositions || 12 },
            { icon: Users, label: 'Connections', value: currentUser?.connections || 284 },
            { icon: Users, label: 'Company Size', value: currentUser?.companySize }].map(s => (
            <div key={s.label} className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <s.icon size={20} color="#06B6D4" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#e2e8f0' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ padding: '1.25rem' }}>
        <h3 style={{ margin: '0 0 1rem', fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>Update Company Information</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {[['Company Name', currentUser?.company], ['Industry', currentUser?.industry], ['Location', currentUser?.location], ['About', currentUser?.about]].map(([label, val]) => (
            <div key={label}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>{label}</label>
              <input className="input" defaultValue={val} />
            </div>
          ))}
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#06B6D4' }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
