import { INDUSTRY_CANDIDATES } from '../../data/companies';
import { Avatar } from '../../components/ui/Avatar';
import { useState } from 'react';

export default function IndustryApplications() {
  const [candidates] = useState(INDUSTRY_CANDIDATES.map((c, i) => ({
    ...c,
    position: ['Full Stack Engineer', 'Data Scientist', 'Backend Developer', 'ML Engineer', 'Frontend Engineer', 'DevOps Engineer'][i % 6],
    appliedDate: ['2026-09-10', '2026-09-12', '2026-09-14', '2026-09-15', '2026-09-16', '2026-09-17'][i],
    appStatus: ['New', 'Reviewed', 'Shortlisted', 'Interview Scheduled', 'New', 'Reviewed'][i],
  })));

  const STATUS_COLORS = {
    New: { bg: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: 'rgba(59,130,246,0.2)' },
    Reviewed: { bg: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: 'rgba(245,158,11,0.2)' },
    Shortlisted: { bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.2)' },
    'Interview Scheduled': { bg: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: 'rgba(139,92,246,0.2)' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>Applications</h1>
        <p style={{ margin: 0, color: '#64748b' }}>{candidates.length} total applications across all positions</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {candidates.map(c => {
          const s = STATUS_COLORS[c.appStatus] || STATUS_COLORS.New;
          return (
            <div key={c.id} className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name={c.name} color={c.color} size="md" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{c.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.institution} • Applied for: {c.position}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                  {c.skills.slice(0, 3).map(sk => <span key={sk} style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem', background: 'rgba(6,182,212,0.08)', color: '#94a3b8', border: '1px solid rgba(6,182,212,0.15)' }}>{sk}</span>)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981' }}>{c.matchScore}%</span>
                <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 500, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                  {c.appStatus}
                </span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.625rem', background: '#06B6D4' }}>Review</button>
                  <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.625rem' }}>Schedule</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
