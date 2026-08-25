import { Sparkles, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export function AIInsight({ user }) {
  if (!user) return null;

  const readiness = user.careerReadiness || 78;
  const projectedReadiness = Math.min(100, readiness + 12);

  const topSkills = (user.skills || []).slice(0, 3);
  const gaps = ['AWS', 'System Design', 'TypeScript'].filter(s => !(user.skills || []).includes(s));

  const actions = [
    { icon: '🎯', text: 'Complete AWS Cloud Practitioner course (est. 20h)', priority: 'high' },
    { icon: '🏗️', text: 'Practice 2 system design problems this week', priority: 'high' },
    { icon: '💼', text: 'Apply to 3 more internships before deadlines', priority: 'medium' },
    { icon: '🤝', text: 'Connect with 2 mentors in your target companies', priority: 'medium' },
  ];

  return (
    <div className="card" style={{ padding: '1.25rem', background: 'linear-gradient(135deg, #0A0F18 0%, #101722 100%)', border: '1px solid rgba(139,92,246,0.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'pulse 3s ease-in-out infinite',
        }}>
          <Sparkles size={16} color="#8B5CF6" />
        </div>
        <div>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>AI Career Insights</span>
          <div style={{ fontSize: '0.7rem', color: '#8B5CF6' }}>Powered by SkillBridge AI</div>
        </div>
      </div>

      {/* Readiness projection */}
      <div style={{
        background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)',
        borderRadius: '0.75rem', padding: '0.875rem', marginBottom: '0.875rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Career Readiness</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#3B82F6' }}>{readiness}%</span>
            <TrendingUp size={12} color="#10B981" />
            <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>→ {projectedReadiness}%</span>
          </div>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 3, width: `${readiness}%`,
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
            transition: 'width 0.6s ease',
          }} />
        </div>
        <p style={{ margin: '6px 0 0', fontSize: '0.7rem', color: '#64748b' }}>
          Complete recommended actions to reach {projectedReadiness}% readiness
        </p>
      </div>

      {/* Strengths */}
      <div style={{ marginBottom: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <CheckCircle size={12} color="#10B981" />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10B981' }}>Your Strengths</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {topSkills.map(s => (
            <span key={s} style={{
              padding: '2px 8px', borderRadius: 4,
              background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
              fontSize: '0.7rem', color: '#34d399', fontWeight: 500,
            }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Gaps */}
      <div style={{ marginBottom: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <AlertTriangle size={12} color="#F59E0B" />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#F59E0B' }}>Priority Skill Gaps</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {gaps.map(s => (
            <span key={s} style={{
              padding: '2px 8px', borderRadius: 4,
              background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
              fontSize: '0.7rem', color: '#fbbf24', fontWeight: 500,
            }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 8 }}>
          Recommended Actions
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {actions.slice(0, 3).map((a, i) => (
            <div key={i} style={{
              display: 'flex', gap: 8, alignItems: 'flex-start',
              padding: '0.5rem', borderRadius: '0.5rem',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <span style={{ fontSize: '0.875rem' }}>{a.icon}</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>{a.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
