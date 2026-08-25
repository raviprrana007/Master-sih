import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, Briefcase, Building2, TrendingUp } from 'lucide-react';
import { MarketPulse } from '../../components/features/MarketPulse';
import { useBreakpoint } from '../../hooks/useBreakpoint';

const PLACEMENT_FUNNEL = [
  { stage: 'Eligible', count: 1240 },
  { stage: 'Applied', count: 980 },
  { stage: 'Shortlisted', count: 540 },
  { stage: 'Interviewed', count: 320 },
  { stage: 'Offered', count: 218 },
  { stage: 'Placed', count: 198 },
];

const SKILL_MATCH = [
  { skill: 'React', demand: 90, supply: 72 },
  { skill: 'Python', demand: 85, supply: 78 },
  { skill: 'ML/AI', demand: 80, supply: 55 },
  { skill: 'Node.js', demand: 75, supply: 60 },
  { skill: 'DevOps', demand: 70, supply: 40 },
  { skill: 'Cloud', demand: 78, supply: 48 },
];

const TOP_STUDENTS = [
  { name: 'Arjun Mehta', branch: 'CSE', cgpa: 9.4, offers: 3, company: 'Google' },
  { name: 'Priya Singh', branch: 'ECE', cgpa: 9.2, offers: 2, company: 'Microsoft' },
  { name: 'Rohan Das', branch: 'CSE', cgpa: 9.0, offers: 2, company: 'Amazon' },
  { name: 'Ananya Roy', branch: 'IT', cgpa: 8.9, offers: 1, company: 'Flipkart' },
  { name: 'Vikram Nair', branch: 'CSE', cgpa: 8.8, offers: 2, company: 'Infosys' },
];

const PARTNERS = [
  { name: 'Google', color: '#4285F4', hired: 8 },
  { name: 'Microsoft', color: '#00A4EF', hired: 12 },
  { name: 'Amazon', color: '#FF9900', hired: 15 },
  { name: 'Infosys', color: '#007CC3', hired: 32 },
  { name: 'TCS', color: '#e2e8f0', hired: 45 },
  { name: 'Wipro', color: '#341C61', hired: 28 },
];

export default function InstitutionDashboard() {
  const { isMobile, isTablet, isWide } = useBreakpoint();
  const showMarketPulseSidebar = isWide;
  const chartHeight = isMobile ? 180 : 220;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: showMarketPulseSidebar ? '1fr 320px' : '1fr',
      gap: 'clamp(12px, 2vw, 24px)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vw, 24px)', minWidth: 0 }}>
        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
          gap: 'clamp(8px, 1.5vw, 16px)',
        }}>
          {[
            { label: 'Total Students', value: '4,820', icon: Users, color: '#3B82F6' },
            { label: 'Placement Rate', value: '86.2%', icon: TrendingUp, color: '#10B981' },
            { label: 'Active Interns', value: '312', icon: Briefcase, color: '#F59E0B' },
            { label: 'Industry Partners', value: '148', icon: Building2, color: '#8B5CF6' },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <s.icon size={20} color={s.color} />
                <span style={{ fontSize: '0.7rem', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: 4 }}>+4.2%</span>
              </div>
              <div style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Placement Funnel */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: 'var(--text-1)' }}>Placement Funnel</h2>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={PLACEMENT_FUNNEL} layout="vertical" margin={{ left: 20, right: 20 }}>
              <XAxis type="number" tick={{ fill: 'var(--text-3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="stage" tick={{ fill: 'var(--text-2)', fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ background: 'var(--surface-el)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-1)' }} />
              <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Demand vs Supply */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: 'var(--text-1)' }}>Skill Demand vs Supply</h2>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={SKILL_MATCH} margin={{ left: 0, right: 20 }}>
              <XAxis dataKey="skill" tick={{ fill: 'var(--text-2)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--surface-el)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-1)' }} />
              <Bar dataKey="demand" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Industry Demand" />
              <Bar dataKey="supply" fill="#10B981" radius={[4, 4, 0, 0]} name="Student Supply" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 8 }}>
            <span style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-2)' }}>
              <span style={{ width: 10, height: 10, background: '#3B82F6', borderRadius: 2, display: 'inline-block' }} />Industry Demand
            </span>
            <span style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-2)' }}>
              <span style={{ width: 10, height: 10, background: '#10B981', borderRadius: 2, display: 'inline-block' }} />Student Supply
            </span>
          </div>
        </div>

        {/* Top Students */}
        <div className="card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: 'var(--text-1)' }}>Top Placed Students</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
            <thead>
              <tr>
                {['Student', 'Branch', 'CGPA', 'Offers', 'Top Company'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-3)', padding: '0 0 8px', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_STUDENTS.map((s, i) => (
                <tr key={s.name} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 0', fontSize: '0.875rem', color: 'var(--text-1)' }}>
                    <span style={{ marginRight: 8, color: 'var(--text-3)', fontSize: '0.75rem' }}>#{i + 1}</span>{s.name}
                  </td>
                  <td style={{ padding: '10px 0', fontSize: '0.8rem', color: 'var(--text-2)' }}>{s.branch}</td>
                  <td style={{ padding: '10px 0', fontSize: '0.875rem', fontWeight: 600, color: '#10B981' }}>{s.cgpa}</td>
                  <td style={{ padding: '10px 0', fontSize: '0.875rem', color: 'var(--text-1)' }}>{s.offers}</td>
                  <td style={{ padding: '10px 0', fontSize: '0.8rem', color: '#3B82F6' }}>{s.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Industry Partners */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: 'var(--text-1)' }}>Key Industry Partners</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 160px), 1fr))',
            gap: '1rem',
          }}>
            {PARTNERS.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: p.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: p.color, flexShrink: 0 }}>{p.name.slice(0, 2)}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-3)' }}>{p.hired} hired</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MarketPulse on mobile/tablet */}
        {!showMarketPulseSidebar && <MarketPulse />}
      </div>

      {/* Right panel on wide screens */}
      {showMarketPulseSidebar && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <MarketPulse />
        </div>
      )}
    </div>
  );
}
