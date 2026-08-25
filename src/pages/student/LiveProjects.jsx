import { LIVE_PROJECTS, WORKSHOPS, INNOVATION_CHALLENGES } from '../../data/collaborations';
import { Users, Clock, Trophy, ExternalLink } from 'lucide-react';
import { Tabs } from '../../components/ui/Tabs';
import { useState } from 'react';

export default function LiveProjects() {
  const [tab, setTab] = useState('projects');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
          Live Projects & Collaboration
        </h1>
        <p style={{ margin: 0, color: '#64748b' }}>Work on real industry projects, attend workshops, and win competitions</p>
      </div>

      <Tabs
        tabs={[
          { value: 'projects', label: 'Live Projects', count: LIVE_PROJECTS.length },
          { value: 'workshops', label: 'Workshops', count: WORKSHOPS.length },
          { value: 'challenges', label: 'Innovation Challenges', count: INNOVATION_CHALLENGES.length },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === 'projects' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {LIVE_PROJECTS.map(p => (
            <div key={p.id} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{
                  padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 600,
                  background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30`,
                }}>
                  {p.type}
                </span>
                <span style={{ fontSize: '0.75rem', color: p.openSlots > 0 ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                  {p.openSlots}/{p.totalSlots} slots open
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>{p.title}</h3>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.company}</div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>{p.description}</p>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {p.skills.map(s => (
                  <span key={s} style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem', background: 'rgba(59,130,246,0.08)', color: '#94a3b8', border: '1px solid rgba(59,130,246,0.15)' }}>{s}</span>
                ))}
              </div>
              <div style={{ padding: '0.5rem 0.75rem', borderRadius: '0.5rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
                <span style={{ fontSize: '0.75rem', color: '#34d399' }}>🏆 {p.reward}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}>
                  Apply Now
                </button>
                <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.375rem 0.75rem' }}>
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'workshops' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {WORKSHOPS.map(w => (
            <div key={w.id} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justify: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 600, background: `${w.color}15`, color: w.color, border: `1px solid ${w.color}30` }}>
                  {w.type}
                </span>
                <span style={{
                  padding: '2px 6px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 600,
                  background: w.mode === 'Online' ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)',
                  color: w.mode === 'Online' ? '#34d399' : '#60a5fa',
                  border: `1px solid ${w.mode === 'Online' ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)'}`,
                }}>
                  {w.mode}
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>{w.title}</h3>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>by {w.organizer}</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>📅 {w.date}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>⏱ {w.duration}</span>
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {w.skills.map(s => <span key={s} style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem', background: 'rgba(59,130,246,0.08)', color: '#94a3b8', border: '1px solid rgba(59,130,246,0.15)' }}>{s}</span>)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: w.price.includes('Free') ? '#10B981' : '#e2e8f0' }}>{w.price}</span>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{w.registered}/{w.seats} registered</div>
              </div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
                Register
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'challenges' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {INNOVATION_CHALLENGES.map(c => (
            <div key={c.id} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.organizer}</span>
                <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 600, background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)' }}>
                  {c.teamSize} members
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>{c.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Trophy size={14} color="#F59E0B" />
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fbbf24' }}>{c.prize}</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>{c.description}</p>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {c.themes.slice(0, 4).map(t => <span key={t} style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem', background: `${c.color}15`, color: c.color }}>{t}</span>)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569' }}>Deadline: {c.deadline} • {c.registered?.toLocaleString('en-IN')} registered</div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
                Register Team
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
