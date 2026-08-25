import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

const SKILL_GAPS = [
  { skill: 'Machine Learning', demand: 88, supply: 52, gap: 36 },
  { skill: 'Cloud Architecture', demand: 82, supply: 48, gap: 34 },
  { skill: 'DevOps/CI-CD', demand: 78, supply: 46, gap: 32 },
  { skill: 'System Design', demand: 85, supply: 55, gap: 30 },
  { skill: 'React/Next.js', demand: 90, supply: 65, gap: 25 },
  { skill: 'Python Advanced', demand: 86, supply: 70, gap: 16 },
  { skill: 'SQL & Databases', demand: 80, supply: 72, gap: 8 },
  { skill: 'Data Structures', demand: 92, supply: 88, gap: 4 },
];

const BRANCH_SKILLS = [
  { branch: 'CSE', fullMark: 100, coding: 85, ml: 65, cloud: 55, devops: 50, soft: 70 },
  { branch: 'IT', fullMark: 100, coding: 78, ml: 55, cloud: 60, devops: 58, soft: 75 },
  { branch: 'ECE', fullMark: 100, coding: 60, ml: 50, cloud: 40, devops: 35, soft: 68 },
  { branch: 'MCA', fullMark: 100, coding: 82, ml: 62, cloud: 52, devops: 48, soft: 72 },
];

const RADAR_DATA = [
  { subject: 'Coding', CSE: 85, IT: 78, ECE: 60 },
  { subject: 'ML/AI', CSE: 65, IT: 55, ECE: 50 },
  { subject: 'Cloud', CSE: 55, IT: 60, ECE: 40 },
  { subject: 'DevOps', CSE: 50, IT: 58, ECE: 35 },
  { subject: 'Soft Skills', CSE: 70, IT: 75, ECE: 68 },
  { subject: 'Domain', CSE: 80, IT: 72, ECE: 82 },
];

const EMERGING = [
  { skill: 'Generative AI / LLMs', urgency: 'Critical', students: 120, growth: '+280%' },
  { skill: 'Kubernetes & Helm', urgency: 'High', students: 85, growth: '+145%' },
  { skill: 'Rust Programming', urgency: 'High', students: 42, growth: '+120%' },
  { skill: 'Web3 / Blockchain', urgency: 'Medium', students: 65, growth: '+85%' },
  { skill: 'AR/VR Development', urgency: 'Medium', students: 38, growth: '+72%' },
];

const URGENCY_COLORS = {
  Critical: { bg: 'rgba(239,68,68,0.1)', color: '#f87171', border: 'rgba(239,68,68,0.2)' },
  High: { bg: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: 'rgba(245,158,11,0.2)' },
  Medium: { bg: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: 'rgba(59,130,246,0.2)' },
};

export default function SkillAnalytics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>Skill Analytics</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Analyze institutional skill gaps and emerging trends</p>
        </div>
        <button className="btn-primary" style={{ background: '#3B82F6' }}>Generate Report</button>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {[
          { label: 'Avg Skill Score', value: '72/100', icon: Zap, color: '#3B82F6' },
          { label: 'Critical Gaps', value: '3', icon: AlertTriangle, color: '#EF4444' },
          { label: 'Skills Met', value: '18/26', icon: CheckCircle, color: '#10B981' },
          { label: 'Industry Match', value: '68%', icon: TrendingUp, color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '1.25rem', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: s.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <s.icon size={18} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Skill Gap chart */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Demand vs Supply Gap Analysis</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={SKILL_GAPS} layout="vertical" margin={{ left: 20, right: 20 }}>
            <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <YAxis type="category" dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={130} />
            <Tooltip contentStyle={{ background: '#141D2A', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0' }} />
            <Bar dataKey="demand" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Industry Demand" />
            <Bar dataKey="supply" fill="#10B981" radius={[0, 4, 4, 0]} name="Student Supply" />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 8 }}>
          <span style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
            <span style={{ width: 10, height: 10, background: '#3B82F6', borderRadius: 2, display: 'inline-block' }} />Industry Demand
          </span>
          <span style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
            <span style={{ width: 10, height: 10, background: '#10B981', borderRadius: 2, display: 'inline-block' }} />Student Supply
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Radar */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Branch Skill Profile</h2>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={RADAR_DATA} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Radar name="CSE" dataKey="CSE" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
              <Radar name="IT" dataKey="IT" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
              <Radar name="ECE" dataKey="ECE" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            {[['#3B82F6', 'CSE'], ['#10B981', 'IT'], ['#F59E0B', 'ECE']].map(([c, l]) => (
              <span key={l} style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />{l}
              </span>
            ))}
          </div>
        </div>

        {/* Emerging skills */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Emerging Skill Trends</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {EMERGING.map(e => {
              const uc = URGENCY_COLORS[e.urgency];
              return (
                <div key={e.skill} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px solid #1e293b' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#e2e8f0' }}>{e.skill}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{e.students} students enrolled</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#10B981' }}>{e.growth}</span>
                    <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 600, background: uc.bg, color: uc.color, border: `1px solid ${uc.border}` }}>{e.urgency}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
