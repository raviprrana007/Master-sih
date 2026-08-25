import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { getGreeting } from '../../utils/timeOfDay';
import { StatCard } from '../../components/ui/StatCard';
import { MarketPulse } from '../../components/features/MarketPulse';
import { AIInsight } from '../../components/features/AIInsight';
import { ContributionGraph } from '../../components/features/ContributionGraph';
import { ProfessorWordCard } from '../../components/features/ProfessorWord';
import { InternshipCard } from '../../components/features/InternshipCard';
import { ConnectionCard } from '../../components/features/ConnectionCard';
import { INTERNSHIPS } from '../../data/internships';
import { PEOPLE } from '../../data/people';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import {
  LayoutDashboard, Brain, TrendingUp, Users,
  Eye, Briefcase, Target, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MiniSkillGap() {
  const topGaps = [
    { skill: 'AWS', gap: 50, demand: 90 },
    { skill: 'Kubernetes', gap: 58, demand: 78 },
    { skill: 'TypeScript', gap: 25, demand: 85 },
    { skill: 'System Design', gap: 40, demand: 82 },
  ];
  return (
    <div className="card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-1)' }}>Priority Skill Gaps</h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>Industry demand</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {topGaps.map(g => (
          <div key={g.skill}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-1)' }}>{g.skill}</span>
              <span style={{ fontSize: '0.7rem', color: '#EF4444' }}>-{g.gap}% gap</span>
            </div>
            <div style={{ position: 'relative', height: 6, borderRadius: 3, background: 'rgba(239,68,68,0.1)' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${g.demand - g.gap}%`, borderRadius: 3, background: '#3B82F6' }} />
              <div style={{
                position: 'absolute', right: 0, top: 0, height: '100%',
                width: `${g.gap}%`, borderRadius: '0 3px 3px 0', background: 'rgba(239,68,68,0.3)',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const { currentUser } = useAuth();
  const { applications, professorWords } = useApp();
  const navigate = useNavigate();
  const { isMobile, isTablet, isDesktop, isWide } = useBreakpoint();

  const topInternships = INTERNSHIPS.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  const topPeople = PEOPLE.filter(p => p.connectionStatus !== 'connected').slice(0, 3);

  const showMarketPulseSidebar = isWide;

  return (
    <div style={{
      display: 'flex',
      gap: 'clamp(12px, 2vw, 24px)',
      alignItems: 'flex-start',
    }}>
      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vw, 24px)' }}>
        {/* Greeting */}
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter, sans-serif' }}>
            {getGreeting(currentUser?.name?.split(' ')[0] || 'there')} 👋
          </h1>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            {' '} • {currentUser?.institution} • {currentUser?.year}
          </p>
        </div>

        {/* Stat cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
          gap: 'clamp(8px, 1.5vw, 16px)',
        }}>
          <StatCard label="Career Readiness" value={`${currentUser?.careerReadiness || 78}%`} icon={Target} color="#3B82F6" sub="↑2% this week" trend={2} />
          <StatCard label="Skill Score" value={currentUser?.skillScore || 74} icon={Brain} color="#8B5CF6" sub="4 skills assessed" />
          <StatCard label="Applications" value={applications.length} icon={Briefcase} color="#10B981" sub="2 in review" />
          <StatCard label="Connections" value={currentUser?.connections || 0} icon={Users} color="#F59E0B" sub={`${currentUser?.profileViews || 0} profile views`} />
        </div>

        {/* AI Insight + Skill Gap */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 'clamp(10px, 1.5vw, 16px)',
        }}>
          <AIInsight user={currentUser} />
          <MiniSkillGap />
        </div>

        {/* Recommended Internships */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-1)' }}>
              Top Internship Matches
            </h2>
            <button onClick={() => navigate('/internships')} className="btn-ghost" style={{ fontSize: '0.8rem' }}>
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(10px, 1.5vw, 16px)',
          }}>
            {topInternships.map(i => <InternshipCard key={i.id} internship={i} />)}
          </div>
        </div>

        {/* Suggested Connections */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-1)' }}>
              People to Connect With
            </h2>
            <button onClick={() => navigate('/discover')} className="btn-ghost" style={{ fontSize: '0.8rem' }}>
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(10px, 1.5vw, 16px)',
          }}>
            {topPeople.map(p => <ConnectionCard key={p.id} person={p} />)}
          </div>
        </div>

        {/* Professor Words */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-1)' }}>
              Words from Professors
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(10px, 1.5vw, 16px)',
          }}>
            {professorWords.slice(0, 2).map(w => <ProfessorWordCard key={w.id} word={w} />)}
          </div>
        </div>

        {/* Contribution Graph */}
        <ContributionGraph userId={currentUser?.id} />

        {/* MarketPulse on mobile/tablet - below main content */}
        {!showMarketPulseSidebar && (
          <MarketPulse />
        )}
      </div>

      {/* Right sidebar - Market Pulse (wide screens only) */}
      {showMarketPulseSidebar && (
        <div style={{ width: 320, flexShrink: 0, position: 'sticky', top: 80 }}>
          <MarketPulse />
        </div>
      )}
    </div>
  );
}
