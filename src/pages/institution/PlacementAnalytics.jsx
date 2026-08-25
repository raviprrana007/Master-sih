import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, Users, Award, DollarSign } from 'lucide-react';

const YEARLY_TREND = [
  { year: '2020', placed: 68, rate: 72 },
  { year: '2021', placed: 120, rate: 78 },
  { year: '2022', placed: 165, rate: 81 },
  { year: '2023', placed: 190, rate: 84 },
  { year: '2024', placed: 198, rate: 86 },
  { year: '2025', placed: 145, rate: 88 },
];

const BRANCH_PLACEMENT = [
  { branch: 'CSE', placed: 98, total: 110, rate: 89 },
  { branch: 'IT', placed: 42, total: 48, rate: 88 },
  { branch: 'ECE', placed: 28, total: 36, rate: 78 },
  { branch: 'EEE', placed: 18, total: 24, rate: 75 },
  { branch: 'ME', placed: 12, total: 20, rate: 60 },
  { branch: 'MCA', placed: 22, total: 24, rate: 92 },
];

const SALARY_DIST = [
  { range: '3-5 LPA', count: 48 },
  { range: '5-8 LPA', count: 72 },
  { range: '8-12 LPA', count: 52 },
  { range: '12-18 LPA', count: 18 },
  { range: '18+ LPA', count: 8 },
];

const SECTOR_DIST = [
  { name: 'IT Services', value: 45, color: '#3B82F6' },
  { name: 'Product', value: 22, color: '#10B981' },
  { name: 'Consulting', value: 15, color: '#8B5CF6' },
  { name: 'Banking', value: 10, color: '#F59E0B' },
  { name: 'Others', value: 8, color: '#64748b' },
];

const TOP_RECRUITERS = [
  { company: 'TCS', count: 45 }, { company: 'Infosys', count: 32 }, { company: 'Wipro', count: 28 },
  { company: 'Accenture', count: 22 }, { company: 'Cognizant', count: 18 }, { company: 'Amazon', count: 15 },
];

export default function PlacementAnalytics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>Placement Analytics</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Comprehensive placement performance metrics and trends</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {[
          { label: 'Placement Rate', value: '86.2%', trend: '+2.4%', icon: TrendingUp, color: '#10B981' },
          { label: 'Students Placed', value: '198', trend: '+8', icon: Users, color: '#3B82F6' },
          { label: 'Avg. CTC', value: '8.4 LPA', trend: '+1.2 LPA', icon: DollarSign, color: '#F59E0B' },
          { label: 'Highest CTC', value: '42 LPA', trend: 'Google', icon: Award, color: '#8B5CF6' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <s.icon size={20} color={s.color} />
              <span style={{ fontSize: '0.7rem', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: 4 }}>{s.trend}</span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#e2e8f0', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Yearly trend */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Placement Trend (2020–2025)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={YEARLY_TREND}>
            <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#141D2A', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0' }} />
            <Line yAxisId="left" type="monotone" dataKey="placed" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 4 }} name="Students Placed" />
            <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 4 }} name="Placement Rate %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Branch-wise */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Branch-wise Placement</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {BRANCH_PLACEMENT.map(b => (
              <div key={b.branch}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>{b.branch}</span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{b.placed}/{b.total} · <span style={{ color: b.rate >= 85 ? '#10B981' : '#F59E0B', fontWeight: 600 }}>{b.rate}%</span></span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)' }}>
                  <div style={{ height: '100%', width: `${b.rate}%`, borderRadius: 3, background: b.rate >= 85 ? '#10B981' : '#F59E0B' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector distribution */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Sector Distribution</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={SECTOR_DIST} dataKey="value" cx="50%" cy="50%" outerRadius={70} paddingAngle={3}>
                {SECTOR_DIST.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#141D2A', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0' }} formatter={(v) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {SECTOR_DIST.map(s => (
              <span key={s.name} style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
                {s.name} {s.value}%
              </span>
            ))}
          </div>
        </div>

        {/* Salary distribution */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Salary Distribution</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={SALARY_DIST}>
              <XAxis dataKey="range" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#141D2A', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0' }} />
              <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top recruiters */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Top Recruiters</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TOP_RECRUITERS.map((r, i) => (
              <div key={r.company} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', width: 16 }}>#{i + 1}</span>
                  <span style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>{r.company}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', width: 80 }}>
                    <div style={{ height: '100%', width: `${(r.count / 45) * 100}%`, borderRadius: 2, background: '#3B82F6' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', width: 24, textAlign: 'right' }}>{r.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
