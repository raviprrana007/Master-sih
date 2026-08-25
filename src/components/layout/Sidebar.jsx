import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Brain, BarChart3, TrendingUp, BookOpen, Sparkles,
  Briefcase, Building2, FileText, Bookmark, Compass, Users, GraduationCap,
  MessageSquare, Code2, Presentation, Lightbulb, Factory, Rss, MessagesSquare,
  Award, Star, Search, PlusCircle, Network, BarChart2, Settings, ChevronLeft,
  ChevronRight, FlaskConical, UserCheck, Globe, School
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const STUDENT_NAV = [
  { section: 'OVERVIEW', items: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  ]},
  { section: 'CAREER', items: [
    { label: 'Skill Assessment', icon: Brain, path: '/assessment' },
    { label: 'Skill Profile', icon: BarChart3, path: '/skills' },
    { label: 'Skill Gap', icon: TrendingUp, path: '/skill-gap' },
    { label: 'Learning', icon: BookOpen, path: '/learning' },
    { label: 'Career Intelligence', icon: Sparkles, path: '/career-ai' },
  ]},
  { section: 'OPPORTUNITIES', items: [
    { label: 'Internships', icon: Briefcase, path: '/internships' },
    { label: 'Jobs', icon: Building2, path: '/jobs' },
    { label: 'Applications', icon: FileText, path: '/applications' },
    { label: 'Saved', icon: Bookmark, path: '/saved' },
  ]},
  { section: 'NETWORK', items: [
    { label: 'Discover', icon: Compass, path: '/discover' },
    { label: 'My Network', icon: Users, path: '/network' },
    { label: 'Mentors', icon: GraduationCap, path: '/mentors' },
    { label: 'Messages', icon: MessageSquare, path: '/messages' },
  ]},
  { section: 'COLLABORATION', items: [
    { label: 'Live Projects', icon: Code2, path: '/projects' },
    { label: 'Workshops', icon: Presentation, path: '/workshops' },
  ]},
  { section: 'COMMUNITY', items: [
    { label: 'Feed', icon: Rss, path: '/feed' },
  ]},
  { section: 'PORTFOLIO', items: [
    { label: 'Digital Portfolio', icon: Award, path: '/portfolio' },
  ]},
];

const INDUSTRY_NAV = [
  { section: 'OVERVIEW', items: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  ]},
  { section: 'JOBS & INTERNSHIPS', items: [
    { label: 'Manage Jobs', icon: Building2, path: '/manage-jobs' },
    { label: 'Manage Internships', icon: Briefcase, path: '/manage-internships' },
    { label: 'Post Opportunity', icon: PlusCircle, path: '/post' },
  ]},
  { section: 'TALENT', items: [
    { label: 'Applications', icon: FileText, path: '/applications' },
    { label: 'Discover Candidates', icon: Search, path: '/candidates' },
    { label: 'Talent Network', icon: Network, path: '/talent-network' },
  ]},
  { section: 'COMMUNICATION', items: [
    { label: 'Messages', icon: MessageSquare, path: '/messages' },
  ]},
  { section: 'ANALYTICS', items: [
    { label: 'Recruitment Analytics', icon: BarChart2, path: '/analytics' },
  ]},
  { section: 'COMPANY', items: [
    { label: 'Company Profile', icon: Star, path: '/company-profile' },
  ]},
];

const ACADEMICIAN_NAV = [
  { section: 'OVERVIEW', items: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  ]},
  { section: 'OPPORTUNITIES', items: [
    { label: 'Faculty Internships', icon: Briefcase, path: '/faculty-internships' },
    { label: 'FDP Programs', icon: Presentation, path: '/fdp' },
    { label: 'Consultancy', icon: Building2, path: '/consultancy' },
    { label: 'Research', icon: FlaskConical, path: '/research' },
  ]},
  { section: 'MENTORSHIP', items: [
    { label: 'Mentorship', icon: UserCheck, path: '/mentorship' },
  ]},
  { section: 'COMMUNICATION', items: [
    { label: 'Messages', icon: MessageSquare, path: '/messages' },
  ]},
  { section: 'PROFILE', items: [
    { label: 'Faculty Profile', icon: Award, path: '/profile' },
  ]},
];

const INSTITUTION_NAV = [
  { section: 'OVERVIEW', items: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  ]},
  { section: 'ANALYTICS', items: [
    { label: 'Placement Analytics', icon: BarChart2, path: '/placement-analytics' },
    { label: 'Skill Analytics', icon: TrendingUp, path: '/skill-analytics' },
  ]},
  { section: 'MANAGEMENT', items: [
    { label: 'Student Directory', icon: Users, path: '/students' },
    { label: 'Industry Partners', icon: Building2, path: '/partners' },
    { label: 'Training Programs', icon: School, path: '/training' },
  ]},
];

const NAV_BY_ROLE = {
  student: STUDENT_NAV,
  industry: INDUSTRY_NAV,
  academician: ACADEMICIAN_NAV,
  institution: INSTITUTION_NAV,
};

export function Sidebar({ collapsed, onToggle }) {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const nav = NAV_BY_ROLE[currentUser?.role] || STUDENT_NAV;

  const roleColors = {
    student: '#3B82F6', industry: '#06B6D4', academician: '#10B981', institution: '#F59E0B',
  };
  const roleColor = roleColors[currentUser?.role] || '#3B82F6';

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{
      position: 'fixed', left: 0, top: 0, height: '100vh',
      width: collapsed ? 64 : 256,
      background: '#0A0F18',
      borderRight: '1px solid #1e293b',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.25s ease',
      zIndex: 100, overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        height: 60, display: 'flex', alignItems: 'center',
        padding: collapsed ? '0 16px' : '0 20px',
        borderBottom: '1px solid #1e293b',
        gap: 12, flexShrink: 0,
        justifyContent: collapsed ? 'center' : 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: `${roleColor}20`, border: `1px solid ${roleColor}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Sparkles size={14} color={roleColor} />
          </div>
          {!collapsed && (
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#e2e8f0', fontFamily: 'Syne, sans-serif', whiteSpace: 'nowrap' }}>
              SkillBridge
            </span>
          )}
        </div>
        {!collapsed && (
          <button onClick={onToggle} className="btn-ghost" style={{ padding: 4, flexShrink: 0 }}>
            <ChevronLeft size={16} />
          </button>
        )}
        {collapsed && (
          <button
            onClick={onToggle}
            style={{
              position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)',
              width: 24, height: 24, borderRadius: '50%',
              background: '#141D2A', border: '1px solid #1e293b',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 10,
            }}
          >
            <ChevronRight size={12} color="#64748b" />
          </button>
        )}
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '12px 8px' }}>
        {nav.map(section => (
          <div key={section.section} style={{ marginBottom: '1.25rem' }}>
            {!collapsed && (
              <span className="section-label">{section.section}</span>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {section.items.map(item => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={active ? 'sidebar-link-active' : 'sidebar-link'}
                    style={{
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      padding: collapsed ? '0.625rem' : undefined,
                    }}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon size={16} style={{ flexShrink: 0 }} />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{
        borderTop: '1px solid #1e293b', padding: '12px 8px', flexShrink: 0,
      }}>
        <button
          onClick={() => navigate('/settings')}
          className={isActive('/settings') ? 'sidebar-link-active' : 'sidebar-link'}
          style={{ justifyContent: collapsed ? 'center' : undefined }}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={16} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Settings</span>}
        </button>
      </div>
    </div>
  );
}
