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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vw, 24px)' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter, sans-serif' }}>
          Discover People
        </h1>
        <p style={{ margin: 0, color: 'var(--text-3)' }}>AI-matched connections relevant to your career journey</p>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', maxWidth: 300, flex: '1 1 200px' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
          <input
            className="input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or skill..."
            style={{ paddingLeft: 32 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.4rem 0.875rem', borderRadius: '2rem',
                cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.15s',
                background: filter === f ? 'var(--accent)' : 'var(--surface-el)',
                color: filter === f ? 'white' : 'var(--text-2)',
                border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border)'}`,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-3)' }}>
        {filtered.length} people matched — sorted by career relevance
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
        gap: 'clamp(10px, 1.5vw, 16px)',
      }}>
        {filtered.map(p => <ConnectionCard key={p.id} person={p} />)}
      </div>
    </div>
  );
}
