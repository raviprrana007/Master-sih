import { useState } from 'react';
import { Search } from 'lucide-react';
import { PEOPLE } from '../../data/people';
import { ConnectionCard } from '../../components/features/ConnectionCard';

const FILTERS = ['All', 'Recruiters', 'Mentors', 'Students', 'Faculty'];

export default function NetworkDiscover() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = PEOPLE.filter(p => {
    const matchFilter = filter === 'All' ||
      (filter === 'Recruiters' && p.role === 'recruiter') ||
      (filter === 'Mentors' && p.role === 'mentor') ||
      (filter === 'Students' && p.role === 'student') ||
      (filter === 'Faculty' && p.role === 'academician');
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.skills.some(s => s.toLowerCase().includes(search.toLowerCase())) || (p.company || p.institution || '').toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
          Discover People
        </h1>
        <p style={{ margin: 0, color: '#64748b' }}>AI-matched connections relevant to your career journey</p>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', maxWidth: 300 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            className="input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or skill..."
            style={{ paddingLeft: 32 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.4rem 0.875rem', borderRadius: '2rem', border: 'none',
                cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.15s',
                background: filter === f ? '#3B82F6' : '#141D2A',
                color: filter === f ? 'white' : '#94a3b8',
                border: `1px solid ${filter === f ? '#3B82F6' : '#1e293b'}`,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
        {filtered.length} people matched — sorted by career relevance
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {filtered.map(p => <ConnectionCard key={p.id} person={p} />)}
      </div>
    </div>
  );
}
