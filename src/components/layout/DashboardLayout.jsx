import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileBottomNav } from './MobileBottomNav';

// Breakpoints
const BP_MOBILE = 768;
const BP_TABLET = 1024;

export default function DashboardLayout({ children }) {
  const [width, setWidth] = useState(() => window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);   // mobile drawer
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop collapse

  const isMobile = width < BP_MOBILE;
  const isTablet = width >= BP_MOBILE && width < BP_TABLET;
  const isDesktop = width >= BP_TABLET;

  useEffect(() => {
    let timeout;
    const handler = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setWidth(window.innerWidth), 50);
    };
    window.addEventListener('resize', handler, { passive: true });
    return () => { window.removeEventListener('resize', handler); clearTimeout(timeout); };
  }, []);

  // Close drawer on escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSidebarOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, sidebarOpen]);

  const sidebarWidth = isMobile ? 0
    : isTablet ? (sidebarCollapsed ? 64 : 220)
    : (sidebarCollapsed ? 64 : 256);

  const handleNavSelect = useCallback(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', position: 'relative' }}>

      {/* Mobile overlay */}
      {isMobile && (
        <div
          className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar: Desktop/Tablet persistent/collapsible, Mobile drawer */}
      <div style={{
        position: 'fixed', left: 0, top: 0, height: '100%', zIndex: 100,
        transform: isMobile
          ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)')
          : 'translateX(0)',
        transition: 'transform 0.25s ease, width 0.25s ease',
        width: isMobile ? 280 : sidebarWidth,
      }}>
        <Sidebar
          collapsed={!isMobile && sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(p => !p)}
          onNavSelect={handleNavSelect}
          isMobile={isMobile}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Topbar */}
      <Topbar
        sidebarWidth={sidebarWidth}
        isMobile={isMobile}
        onMenuClick={() => setSidebarOpen(p => !p)}
        sidebarOpen={sidebarOpen}
      />

      {/* Main content */}
      <main style={{
        marginLeft: sidebarWidth,
        paddingTop: 60,
        paddingBottom: isMobile ? `calc(72px + env(safe-area-inset-bottom))` : 0,
        minHeight: '100dvh',
        transition: 'margin-left 0.25s ease',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: `clamp(12px, 2.5vw, 28px)`,
          maxWidth: 1440,
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      {isMobile && <MobileBottomNav />}
    </div>
  );
}
