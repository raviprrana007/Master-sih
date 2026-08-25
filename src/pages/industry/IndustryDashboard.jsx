import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { getGreeting } from '../../utils/timeOfDay';
import { StatCard } from '../../components/ui/StatCard';
import { MarketPulse } from '../../components/features/MarketPulse';
import { INDUSTRY_CANDIDATES } from '../../data/companies';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Briefcase, Users, CheckCircle, Calendar, TrendingUp, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../components/ui/Avatar';

const APP_TREND = [
  { week: 'W1', apps: 45 }, { week: 'W2', apps: 78 }, { week: 'W3', apps: 62 },
  { week: 'W4', apps: 95 }, { week: 'W5', apps: 110 }, { week: 'W6', apps: 87 },
  { week: 'W7', apps: 134 }, { week: 'W8', apps: 156 },
];

const SKILL_DIST = [
  { skill: 'React', count: 89 }, { skill: 'Python', count: 124 }, { skill: 'Java', count: 67 },
  { skill: 'Node.js', count: 54 }, { skill: 'AWS', count: 43 },
];

const ACTIVE_JOBS = [
  { title: 'Full Stack Engineer', apps: 156, shortlisted: 12, status: 'Active' },
  { title: 'Data Scientist', apps: 89, shortlisted: 8, status: 'Active' },
  { title: 'Backend Developer', apps: 67, shortlisted: 5, status: 'Active' },
  { title: 'ML Engineer', apps: 45, shortlisted: 3, status: 'Paused' },
];

export default function IndustryDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
            {getGreeting(currentUser?.name?.split(' ')[0])} 👋
          </h1>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
            {currentUser?.company} • {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <StatCard label="Open Positions" value={currentUser?.openPositions || 12} icon={Briefcase} color="#06B6D4" />
          <StatCard label="Applications" value={357} icon={Users} color="#3B82F6" sub="This month" />
          <StatCard label="Shortlisted" value={28} icon={CheckCircle} color="#10B981" />
          <StatCard label="Interviews" value={8} icon={Calendar} color="#8B5CF6" sub="Scheduled" />
          <StatCard label="Hires" value={3} icon={TrendingUp} color="#F59E0B" sub="This month" />
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Applications Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={APP_TREND}>
                <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#141D2A', border: '1px solid #1e293b', borderRadius: 8 }} />
                <Line type="monotone" dataKey="apps" stroke="#06B6D4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Top Candidate Skills</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={SKILL_DIST} layout="vertical">
                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="skill" type="category" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip contentStyle={{ background: '#141D2A', border: '1px solid #1e293b', borderRadius: 8 }} />
                <Bar dataKey="count" fill="#06B6D4" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top candidates */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Top Matching Candidates</h2>
            <button onClick={() => navigate('/candidates')} className="btn-ghost" style={{ fontSize: '0.8rem' }}>
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {INDUSTRY_CANDIDATES.slice(0, 3).map(c => (
              <div key={c.id} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: '0.875rem' }}>
                  <Avatar name={c.name} color={c.color} size="md" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.institution} • CGPA {c.cgpa}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981' }}>{c.matchScore}% match</span>
                      {c.openToWork && <span style={{ fontSize: '0.65rem', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '1px 5px', borderRadius: 4, border: '1px solid rgba(16,185,129,0.2)' }}>Open to work</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: '0.875rem' }}>
                  {c.skills.slice(0, 3).map(s => <span key={s} style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem', background: 'rgba(6,182,212,0.08)', color: '#94a3b8', border: '1px solid rgba(6,182,212,0.15)' }}>{s}</span>)}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}>View</button>
                  <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}>Connect</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active job postings */}
        <div>
          <h2 style={{ margin: '0 0 0.875rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Active Job Postings</h2>
          <div className="card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b' }}>
                  {['Job Title', 'Applications', 'Shortlisted', 'Status'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ACTIVE_JOBS.map((j, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #0A0F18' }}>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 500 }}>{j.title}</td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#94a3b8' }}>{j.apps}</td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#94a3b8' }}>{j.shortlisted}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 500,
                        background: j.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                        color: j.status === 'Active' ? '#34d399' : '#fbbf24',
                        border: `1px solid ${j.status === 'Active' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                      }}>
                        {j.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ width: 320, flexShrink: 0, position: 'sticky', top: 80 }} className="market-pulse-sidebar">
        <MarketPulse />
      </div>

      <style>{`@media (max-width: 1200px) { .market-pulse-sidebar { display: none !important; } }`}</style>
    </div>
  );
}
