import { useState } from 'react';
import { Search, UserPlus, MessageCircle, Star } from 'lucide-react';
import { INDUSTRY_CANDIDATES } from '../../data/companies';
import { Avatar } from '../../components/ui/Avatar';

export default function CandidateDiscovery() {
  const [search, setSearch] = useState('');
  const [cgpaMin, setCgpaMin] = useState(7.0);

  const filtered = INDUSTRY_CANDIDATES.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.institution.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchCgpa = c.cgpa >= cgpaMin;
    return matchSearch && matchCgpa;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>Discover Candidates</h1>
        <p style={{ margin: 0, color: '#64748b' }}>AI-ranked student profiles matching your requirements</p>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', maxWidth: 300 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, skill, institution..." style={{ paddingLeft: 32 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Min CGPA:</span>
          <select
            value={cgpaMin}
            onChange={e => setCgpaMin(Number(e.target.value))}
            style={{ background: '#141D2A', border: '1px solid #1e293b', color: '#e2e8f0', padding: '0.4rem 0.75rem', borderRadius: 8, fontSize: '0.875rem' }}
          >
            {[7.0, 7.5, 8.0, 8.5, 9.0].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {filtered.map(c => (
          <div key={c.id} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: '0.875rem' }}>
              <Avatar name={c.name} color={c.color} size="lg" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{c.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.institution}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.year} • CGPA {c.cgpa}</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 4, alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981' }}>{c.matchScore}% match</span>
                  {c.openToWork && <span style={{ fontSize: '0.65rem', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '1px 5px', borderRadius: 4, border: '1px solid rgba(16,185,129,0.2)' }}>Open to work</span>}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: '0.875rem' }}>
              {c.skills.map(s => <span key={s} style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem', background: 'rgba(6,182,212,0.08)', color: '#94a3b8', border: '1px solid rgba(6,182,212,0.15)' }}>{s}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}>View Portfolio</button>
              <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.375rem 0.75rem' }}><MessageCircle size={13} /></button>
              <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.375rem 0.75rem' }}><Star size={13} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
