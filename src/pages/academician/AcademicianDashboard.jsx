import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { getGreeting } from '../../utils/timeOfDay';
import { StatCard } from '../../components/ui/StatCard';
import { MarketPulse } from '../../components/features/MarketPulse';
import { ProfessorWordCard } from '../../components/features/ProfessorWord';
import { Users, BookOpen, FlaskConical, Award, Send } from 'lucide-react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useState } from 'react';

const OPPORTUNITY_CARDS = [
  { icon: '🎓', title: 'Faculty Development Programs', desc: '24 active FDP opportunities', color: '#10B981', path: '/fdp' },
  { icon: '💼', title: 'Industry Training Programs', desc: '12 industry collaboration requests', color: '#3B82F6', path: '/fdp' },
  { icon: '🔬', title: 'Research Collaborations', desc: '8 open research projects', color: '#8B5CF6', path: '/research' },
  { icon: '🤝', title: 'Consultancy Projects', desc: '5 industry consultancy offers', color: '#F59E0B', path: '/consultancy' },
];

export default function AcademicianDashboard() {
  const { currentUser } = useAuth();
  const { professorWords, publishProfessorWord } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ message: '', topic: '' });
  const { isMobile, isWide } = useBreakpoint();

  const handlePublish = () => {
    if (!form.message.trim()) return;
    publishProfessorWord({
      professor: currentUser.name,
      institution: currentUser.institution,
      department: currentUser.department,
      color: currentUser.color,
      message: form.message,
      topic: form.topic || 'General',
    });
    setForm({ message: '', topic: '' });
    setShowForm(false);
  };

  const showMarketPulseSidebar = isWide;

  return (
    <div style={{ display: 'flex', gap: 'clamp(12px, 2vw, 24px)', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vw, 24px)' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter, sans-serif' }}>
            {getGreeting(currentUser?.name?.split(' ')[0])} 👋
          </h1>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-3)' }}>
            {currentUser?.department} • {currentUser?.institution}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
          gap: 'clamp(8px, 1.5vw, 16px)',
        }}>
          <StatCard label="Connections" value={currentUser?.connections || 156} icon={Users} color="#10B981" />
          <StatCard label="Publications" value={currentUser?.publications || 23} icon={BookOpen} color="#3B82F6" />
          <StatCard label="Research Projects" value={currentUser?.researchProjects || 5} icon={FlaskConical} color="#8B5CF6" />
          <StatCard label="Active Mentees" value={12} icon={Award} color="#F59E0B" />
        </div>

        {/* Opportunities */}
        <div>
          <h2 style={{ margin: '0 0 0.875rem', fontSize: '1rem', fontWeight: 600, color: 'var(--text-1)' }}>Opportunities For You</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
            gap: 'clamp(10px, 1.5vw, 16px)',
          }}>
            {OPPORTUNITY_CARDS.map(o => (
              <div key={o.title} className="card" style={{ padding: '1.25rem', cursor: 'pointer', border: `1px solid ${o.color}20`, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${o.color}40`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${o.color}20`; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>{o.icon}</div>
                <h3 style={{ margin: '0 0 4px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-1)' }}>{o.title}</h3>
                <p style={{ margin: '0 0 0.875rem', fontSize: '0.75rem', color: 'var(--text-3)' }}>{o.desc}</p>
                <span style={{ fontSize: '0.75rem', color: o.color, fontWeight: 600 }}>View →</span>
              </div>
            ))}
          </div>
        </div>

        {/* Publish word */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showForm ? '0.875rem' : 0, flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-1)' }}>Words from Professors</h3>
            <button onClick={() => setShowForm(p => !p)} className="btn-primary" style={{ background: '#10B981' }}>
              <Send size={14} /> {showForm ? 'Cancel' : 'Publish Word'}
            </button>
          </div>
          {showForm && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input className="input" value={form.topic} onChange={e => setForm(p => ({ ...p, topic: e.target.value }))} placeholder="Topic (e.g. Career Advice, AI Ethics)" />
              <textarea className="input" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Share your wisdom with students..." rows={4} style={{ resize: 'vertical' }} />
              <button onClick={handlePublish} className="btn-primary" style={{ alignSelf: 'flex-end', background: '#10B981' }}>Publish</button>
            </div>
          )}
        </div>

        {/* Recent words */}
        <div>
          <h2 style={{ margin: '0 0 0.875rem', fontSize: '1rem', fontWeight: 600, color: 'var(--text-1)' }}>Your Published Words</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {professorWords.filter(w => w.professor === currentUser?.name).slice(0, 3).map(w => (
              <ProfessorWordCard key={w.id} word={w} />
            ))}
          </div>
        </div>

        {!showMarketPulseSidebar && <MarketPulse />}
      </div>

      {showMarketPulseSidebar && (
        <div style={{ width: 320, flexShrink: 0, position: 'sticky', top: 80 }}>
          <MarketPulse />
        </div>
      )}
    </div>
  );
}
