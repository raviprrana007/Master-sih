import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '../../components/ui/StatCard';
import { TrendingUp, Users, CheckCircle, Star } from 'lucide-react';

const TREND = [
  { month: 'Apr', apps: 45 }, { month: 'May', apps: 67 }, { month: 'Jun', apps: 89 },
  { month: 'Jul', apps: 120 }, { month: 'Aug', apps: 156 }, { month: 'Sep', apps: 178 },
];

const FUNNEL = [
  { stage: 'Applications', count: 357 },
  { stage: 'Reviewed', count: 245 },
  { stage: 'Shortlisted', count: 89 },
  { stage: 'Interviewed', count: 34 },
  { stage: 'Offered', count: 12 },
  { stage: 'Hired', count: 8 },
];

export default function RecruitmentAnalytics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>Recruitment Analytics</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Data-driven insights for your hiring process</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        <StatCard label="Total Applications" value={357} icon={Users} color="#06B6D4" trend={23} />
        <StatCard label="Offer Rate" value="3.4%" icon={TrendingUp} color="#3B82F6" />
        <StatCard label="Acceptance Rate" value="67%" icon={CheckCircle} color="#10B981" />
        <StatCard label="Avg Match Score" value="82%" icon={Star} color="#F59E0B" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Application Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={TREND}>
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#141D2A', border: '1px solid #1e293b', borderRadius: 8 }} />
              <Line type="monotone" dataKey="apps" stroke="#06B6D4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Hiring Funnel</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={FUNNEL} layout="vertical">
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="stage" type="category" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ background: '#141D2A', border: '1px solid #1e293b', borderRadius: 8 }} />
              <Bar dataKey="count" fill="#06B6D4" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
