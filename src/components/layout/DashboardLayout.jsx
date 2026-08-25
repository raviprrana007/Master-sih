import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileBottomNav } from './MobileBottomNav';

export default function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const sidebarWidth = isMobile ? 0 : sidebarCollapsed ? 64 : 256;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar: only on non-mobile */}
      {!isMobile && (
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(p => !p)}
        />
      )}

      {/* Topbar */}
      <Topbar sidebarWidth={sidebarWidth} />

      {/* Main content */}
      <main style={{
        marginLeft: sidebarWidth,
        paddingTop: 60,
        paddingBottom: isMobile ? 72 : 0,
        minHeight: '100vh',
        transition: 'margin-left 0.25s ease',
      }}>
        <div style={{ padding: '1.5rem', maxWidth: 1440, margin: '0 auto' }}>
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      {isMobile && <MobileBottomNav />}
    </div>
  );
}
