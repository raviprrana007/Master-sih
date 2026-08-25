import { useState } from 'react';
import { BookOpen, Star, Clock, Users, ExternalLink, Filter } from 'lucide-react';
import { COURSES } from '../../data/courses';

const FILTERS = ['All', 'Free', 'Best Seller', 'Certificate', 'AI/ML', 'Cloud', 'DevOps'];

export default function LearningPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = COURSES.filter(c => {
    const matchFilter = filter === 'All' || c.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())) || (filter === 'Free' && c.isFree);
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.platform.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
          Learning Paths
        </h1>
        <p style={{ margin: 0, color: '#64748b' }}>Curated courses to close your skill gaps and advance your career</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          className="input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search courses..."
          style={{ maxWidth: 280 }}
        />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.375rem 0.875rem', borderRadius: '2rem', border: 'none',
                cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500,
                transition: 'all 0.15s', fontFamily: 'Plus Jakarta Sans, sans-serif',
                background: filter === f ? '#3B82F6' : '#141D2A',
                color: filter === f ? 'white' : '#94a3b8',
                border: `1px solid ${filter === f ? '#3B82F6' : '#1e293b'}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Course grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {filtered.map(course => (
          <div key={course.id} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                padding: '3px 8px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 700,
                background: `${course.platformColor}15`, color: course.platformColor,
                border: `1px solid ${course.platformColor}30`,
              }}>
                {course.platform}
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {course.isFree && (
                  <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: '0.65rem', fontWeight: 600, background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
                    FREE
                  </span>
                )}
                {course.tags.slice(0, 1).map(t => (
                  <span key={t} style={{ padding: '2px 6px', borderRadius: 4, fontSize: '0.65rem', fontWeight: 600, background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.4 }}>
              {course.title}
            </h3>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{course.instructor}</div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#F59E0B' }}>
                <Star size={11} fill="#F59E0B" /> {course.rating}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#64748b' }}>
                <Clock size={11} /> {course.duration}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#64748b' }}>
                <Users size={11} /> {course.enrolled}
              </div>
            </div>

            {/* Skills */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {course.skills.slice(0, 4).map(s => (
                <span key={s} style={{
                  padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem',
                  background: 'rgba(59,130,246,0.08)', color: '#94a3b8', border: '1px solid rgba(59,130,246,0.15)',
                }}>
                  {s}
                </span>
              ))}
            </div>

            <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>{course.description}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <div>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: course.isFree ? '#10B981' : '#e2e8f0' }}>
                  {course.price}
                </span>
                {course.originalPrice && (
                  <span style={{ fontSize: '0.75rem', color: '#475569', textDecoration: 'line-through', marginLeft: 6 }}>
                    {course.originalPrice}
                  </span>
                )}
              </div>
              <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.375rem 0.875rem' }}>
                <ExternalLink size={13} /> {course.isFree ? 'Enroll Free' : 'View Course'}
              </button>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '0.375rem 0.625rem', background: 'rgba(59,130,246,0.06)',
              borderRadius: 6, border: '1px solid rgba(59,130,246,0.1)',
            }}>
              <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Career match:</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#3B82F6' }}>{course.matchScore}%</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          <BookOpen size={40} style={{ opacity: 0.3, margin: '0 auto 1rem', display: 'block' }} />
          <p>No courses match your search. Try different filters.</p>
        </div>
      )}
    </div>
  );
}
