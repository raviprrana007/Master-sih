import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Users, MessageSquare, User, Building2, BarChart2, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const STUDENT_NAV = [
  { icon: LayoutDashboard, label: 'Home', path: '/' },
  { icon: Briefcase, label: 'Internships', path: '/internships' },
  { icon: Users, label: 'Network', path: '/discover' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: User, label: 'Portfolio', path: '/portfolio' },
];

const INDUSTRY_NAV = [
  { icon: LayoutDashboard, label: 'Home', path: '/' },
  { icon: Building2, label: 'Jobs', path: '/manage-jobs' },
  { icon: Users, label: 'Talent', path: '/candidates' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
];

const ACADEMICIAN_NAV = [
  { icon: LayoutDashboard, label: 'Home', path: '/' },
  { icon: Briefcase, label: 'Opportunities', path: '/faculty-internships' },
  { icon: GraduationCap, label: 'Mentorship', path: '/mentorship' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const INSTITUTION_NAV = [
  { icon: LayoutDashboard, label: 'Home', path: '/' },
  { icon: BarChart2, label: 'Analytics', path: '/placement-analytics' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: Building2, label: 'Partners', path: '/partners' },
  { icon: User, label: 'Settings', path: '/settings' },
];

const NAV_BY_ROLE = {
  student: STUDENT_NAV,
  industry: INDUSTRY_NAV,
  academician: ACADEMICIAN_NAV,
  institution: INSTITUTION_NAV,
};

export function MobileBottomNav() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const nav = NAV_BY_ROLE[currentUser?.role] || STUDENT_NAV;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      height: `calc(56px + env(safe-area-inset-bottom))`,
      paddingBottom: 'env(safe-area-inset-bottom)',
      background: 'var(--sidebar-bg)',
      borderTop: '1px solid var(--border)',
      backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around',
      zIndex: 80,
      paddingTop: 0,
    }}>
      {nav.map(item => {
        const active = isActive(item.path);
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4,
              padding: '8px 4px',
              minHeight: 44, minWidth: 44,
              background: 'none', border: 'none', cursor: 'pointer',
              color: active ? 'var(--accent)' : 'var(--text-3)',
              transition: 'color 0.2s',
            }}
          >
            <div style={{
              width: 36, height: 28, borderRadius: 8,
              background: active ? 'var(--accent-light)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}>
              <Icon size={18} />
            </div>
            <span style={{ fontSize: '0.65rem', fontWeight: active ? 600 : 400 }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
