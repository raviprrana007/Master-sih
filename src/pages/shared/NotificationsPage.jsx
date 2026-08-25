import { useApp } from '../../context/AppContext';
import { Bell, Check, Trash2, BriefcaseBusiness, Users, MessageSquare, Star, AlertCircle } from 'lucide-react';

const ICON_MAP = {
  application: BriefcaseBusiness,
  connection: Users,
  message: MessageSquare,
  achievement: Star,
  system: AlertCircle,
};

const COLOR_MAP = {
  application: '#3B82F6',
  connection: '#10B981',
  message: '#8B5CF6',
  achievement: '#F59E0B',
  system: '#64748b',
};

export default function NotificationsPage() {
  const { notifications, markNotificationRead, clearNotifications } = useApp();

  const unread = notifications.filter(n => !n.read).length;

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>Notifications</h1>
          <p style={{ margin: 0, color: '#64748b' }}>{unread > 0 ? `${unread} unread notification${unread > 1 ? 's' : ''}` : 'All caught up!'}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {unread > 0 && (
            <button
              className="btn-secondary"
              onClick={() => notifications.filter(n => !n.read).forEach(n => markNotificationRead(n.id))}
              style={{ fontSize: '0.8rem', display: 'flex', gap: 4, alignItems: 'center' }}
            >
              <Check size={14} /> Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              className="btn-secondary"
              onClick={clearNotifications}
              style={{ fontSize: '0.8rem', display: 'flex', gap: 4, alignItems: 'center', color: '#EF4444', borderColor: 'rgba(239,68,68,0.3)' }}
            >
              <Trash2 size={14} /> Clear all
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
          <Bell size={48} color="#1e293b" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ margin: '0 0 8px', color: '#e2e8f0' }}>No notifications yet</h3>
          <p style={{ margin: 0, color: '#64748b' }}>When you get notifications, they'll appear here.</p>
        </div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          {notifications.map((n, i) => {
            const Icon = ICON_MAP[n.type] || Bell;
            const color = COLOR_MAP[n.type] || '#64748b';
            return (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                style={{
                  display: 'flex', gap: 12, padding: '1rem 1.25rem',
                  borderTop: i > 0 ? '1px solid #1e293b' : 'none',
                  background: n.read ? 'transparent' : 'rgba(59,130,246,0.04)',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color={color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <p style={{ margin: '0 0 4px', fontSize: '0.875rem', color: n.read ? '#94a3b8' : '#e2e8f0', lineHeight: 1.4 }}>{n.message}</p>
                    {!n.read && (
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6', flexShrink: 0, marginTop: 4 }} />
                    )}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{n.time || 'Just now'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
