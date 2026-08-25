import { useState, useRef, useEffect } from 'react';
import { Search, Bell, LogOut, User, Settings, ChevronDown, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar } from '../ui/Avatar';
import { DemoUserSwitcher } from '../features/DemoUserSwitcher';
import { CommandPalette } from '../features/CommandPalette';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/assessment': 'Skill Assessment',
  '/skills': 'Skill Profile',
  '/skill-gap': 'Skill Gap Analysis',
  '/learning': 'Learning',
  '/career-ai': 'Career Intelligence',
  '/internships': 'Internships',
  '/jobs': 'Jobs',
  '/applications': 'Applications',
  '/saved': 'Saved',
  '/discover': 'Discover People',
  '/network': 'My Network',
  '/mentors': 'Mentors',
  '/messages': 'Messages',
  '/projects': 'Live Projects',
  '/workshops': 'Workshops',
  '/feed': 'Community Feed',
  '/portfolio': 'Digital Portfolio',
  '/manage-jobs': 'Manage Jobs',
  '/manage-internships': 'Manage Internships',
  '/post': 'Post Opportunity',
  '/applications': 'Applications',
  '/candidates': 'Discover Candidates',
  '/talent-network': 'Talent Network',
  '/analytics': 'Recruitment Analytics',
  '/company-profile': 'Company Profile',
  '/faculty-internships': 'Faculty Internships',
  '/fdp': 'FDP Programs',
  '/consultancy': 'Consultancy',
  '/research': 'Research',
  '/mentorship': 'Mentorship',
  '/profile': 'Faculty Profile',
  '/placement-analytics': 'Placement Analytics',
  '/skill-analytics': 'Skill Analytics',
  '/students': 'Student Directory',
  '/partners': 'Industry Partners',
  '/training': 'Training Programs',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
};

export function Topbar({ sidebarWidth }) {
  const { currentUser, logout } = useAuth();
  const { unreadCount, theme, setTheme } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const userMenuRef = useRef(null);

  const pageTitle = PAGE_TITLES[location.pathname] || 'SkillBridge';

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
        setShowSwitcher(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowPalette(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, right: 0,
        left: sidebarWidth,
        height: 60, zIndex: 50,
        background: 'var(--topbar-bg)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        padding: '0 1.25rem', gap: 12,
        transition: 'left 0.25s ease',
      }}>
        {/* Page title */}
        <h1 style={{
          margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-1)',
          fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap',
        }}>
          {pageTitle}
        </h1>

        {/* Search */}
        <button
          onClick={() => setShowPalette(true)}
          style={{
            flex: 1, maxWidth: 400, display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '0.5rem',
            padding: '0.4rem 0.75rem', cursor: 'text',
            color: 'var(--text-3)', fontSize: '0.875rem',
          }}
        >
          <Search size={14} />
          <span style={{ flex: 1, textAlign: 'left' }}>Search everything...</span>
          <span style={{
            fontSize: '0.7rem', padding: '1px 6px', borderRadius: 4,
            background: 'var(--surface-el)', border: '1px solid var(--border)', color: 'var(--text-3)',
          }}>
            Ctrl K
          </span>
        </button>

        <div style={{ flex: 1 }} />

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            background: 'var(--surface-el)', border: '1px solid var(--border)',
            borderRadius: 8, cursor: 'pointer', color: 'var(--text-2)',
            padding: 7, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--card-hover)'; e.currentTarget.style.color = 'var(--text-1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-el)'; e.currentTarget.style.color = 'var(--text-2)'; }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <button
          onClick={() => navigate('/notifications')}
          style={{
            position: 'relative', background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--text-2)', padding: 8, borderRadius: 8,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--card-hover)'; e.currentTarget.style.color = 'var(--text-1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-2)'; }}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <div style={{
              position: 'absolute', top: 4, right: 4,
              width: 16, height: 16, borderRadius: '50%',
              background: '#EF4444', fontSize: '0.6rem', fontWeight: 700,
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
        </button>

        {/* User menu */}
        <div ref={userMenuRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setShowUserMenu(p => !p); setShowSwitcher(false); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px 8px', borderRadius: 8,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#141D2A'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <Avatar name={currentUser?.name} color={currentUser?.color} size="sm" />
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#e2e8f0', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentUser?.name?.split(' ')[0]}
            </span>
            <ChevronDown size={14} color="#64748b" />
          </button>

          {showUserMenu && (
            <div
              className="animate-fade-in"
              style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '0.75rem', overflow: 'hidden', minWidth: 200,
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)', zIndex: 200,
              }}
            >
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-1)' }}>{currentUser?.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{currentUser?.email}</div>
              </div>
              <div style={{ padding: '0.5rem' }}>
                <MenuItem icon={User} label="Profile" onClick={() => { navigate('/portfolio'); setShowUserMenu(false); }} />
                <MenuItem icon={Settings} label="Settings" onClick={() => { navigate('/settings'); setShowUserMenu(false); }} />
                <div style={{ margin: '0.25rem 0', height: 1, background: 'var(--border)' }} />
                <MenuItem
                  icon={User}
                  label="Switch Demo User"
                  onClick={() => setShowSwitcher(p => !p)}
                  rightEl={<ChevronDown size={12} color="var(--text-3)" />}
                />
                {showSwitcher && (
                  <div style={{ marginTop: 4 }}>
                    <DemoUserSwitcher onClose={() => { setShowSwitcher(false); setShowUserMenu(false); }} />
                  </div>
                )}
                <div style={{ margin: '0.25rem 0', height: 1, background: 'var(--border)' }} />
                <MenuItem icon={LogOut} label="Sign out" onClick={handleLogout} danger />
              </div>
            </div>
          )}
        </div>
      </div>

      <CommandPalette isOpen={showPalette} onClose={() => setShowPalette(false)} />
    </>
  );
}

function MenuItem({ icon: Icon, label, onClick, danger, rightEl }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: 'none',
        cursor: 'pointer', background: 'transparent',
        color: danger ? '#EF4444' : 'var(--text-2)', fontSize: '0.875rem',
        transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = danger ? 'rgba(239,68,68,0.1)' : 'var(--card-hover)';
        e.currentTarget.style.color = danger ? '#f87171' : 'var(--text-1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = danger ? '#EF4444' : 'var(--text-2)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon size={14} />
        {label}
      </div>
      {rightEl}
    </button>
  );
}
