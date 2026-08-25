import { useState, useEffect, useRef } from 'react';
import { Search, X, Briefcase, Users, BookOpen, Building2, ChevronRight } from 'lucide-react';
import { INTERNSHIPS } from '../../data/internships';
import { JOBS } from '../../data/jobs';
import { PEOPLE } from '../../data/people';
import { COURSES } from '../../data/courses';

const ALL_ITEMS = [
  ...INTERNSHIPS.map(i => ({ ...i, _type: 'Internship', _icon: Briefcase, _sub: i.company })),
  ...JOBS.map(j => ({ ...j, _type: 'Job', _icon: Building2, _sub: j.company })),
  ...PEOPLE.map(p => ({ ...p, _type: 'Person', _icon: Users, _sub: p.company || p.institution })),
  ...COURSES.map(c => ({ ...c, _type: 'Course', _icon: BookOpen, _sub: c.platform })),
];

const TYPE_COLORS = {
  Internship: '#10B981', Job: '#3B82F6', Person: '#8B5CF6', Course: '#F59E0B',
};

export function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setFocused(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const results = query.length < 2 ? [] : ALL_ITEMS.filter(item => {
    const q = query.toLowerCase();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.name?.toLowerCase().includes(q) ||
      item._sub?.toLowerCase().includes(q) ||
      item.skills?.some(s => s.toLowerCase().includes(q))
    );
  }).slice(0, 10);

  const grouped = {};
  results.forEach(r => {
    if (!grouped[r._type]) grouped[r._type] = [];
    grouped[r._type].push(r);
  });

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') setFocused(p => Math.min(p + 1, results.length - 1));
    if (e.key === 'ArrowUp') setFocused(p => Math.max(p - 1, 0));
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '15vh', padding: '15vh 1rem 1rem',
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="animate-slide-up"
        style={{
          width: '100%', maxWidth: 580,
          background: '#141D2A', border: '1px solid #243044',
          borderRadius: '1rem', overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '1rem', borderBottom: '1px solid #1e293b' }}>
          <Search size={18} color="#64748b" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setFocused(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Search internships, jobs, people, courses..."
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: '1rem', color: '#e2e8f0', fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          />
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          {query.length < 2 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.875rem' }}>
              Type at least 2 characters to search...
            </div>
          )}
          {query.length >= 2 && results.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.875rem' }}>
              No results found for "{query}"
            </div>
          )}
          {Object.entries(grouped).map(([type, items]) => (
            <div key={type}>
              <div style={{ padding: '0.5rem 1rem', fontSize: '0.7rem', fontWeight: 600, color: '#475569', background: '#0A0F18', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {type}s
              </div>
              {items.map((item, idx) => {
                const Icon = item._icon;
                const color = TYPE_COLORS[item._type];
                const globalIdx = results.indexOf(item);
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '0.75rem 1rem', cursor: 'pointer',
                      background: globalIdx === focused ? '#1A2333' : 'transparent',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={() => setFocused(globalIdx)}
                    onClick={onClose}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: `${color}15`, border: `1px solid ${color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Icon size={14} color={color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 500 }}>
                        {item.title || item.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item._sub}</div>
                    </div>
                    <span style={{
                      padding: '2px 6px', borderRadius: 4, fontSize: '0.65rem', fontWeight: 600,
                      background: `${color}15`, color,
                    }}>
                      {item._type}
                    </span>
                    <ChevronRight size={14} color="#334155" />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid #1e293b', display: 'flex', gap: 12 }}>
          <span style={{ fontSize: '0.65rem', color: '#334155' }}>↑↓ navigate</span>
          <span style={{ fontSize: '0.65rem', color: '#334155' }}>↵ select</span>
          <span style={{ fontSize: '0.65rem', color: '#334155' }}>esc close</span>
        </div>
      </div>
    </div>
  );
}
