import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { DEMO_USERS } from '../../data/users';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { MOCK_USERS } from '../../data/users';

export function DemoUserSwitcher({ onClose }) {
  const { currentUser, switchUser } = useAuth();

  const handleSwitch = (key) => {
    switchUser(key);
    if (onClose) onClose();
    window.location.reload();
  };

  return (
    <div style={{
      background: '#0A0F18', border: '1px solid #1e293b',
      borderRadius: '0.75rem', overflow: 'hidden', minWidth: 260,
    }}>
      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #1e293b' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Switch Demo User
        </span>
      </div>
      {DEMO_USERS.map(u => {
        const user = MOCK_USERS[u.key];
        const isActive = currentUser?.id === u.key;
        return (
          <button
            key={u.key}
            onClick={() => handleSwitch(u.key)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '0.625rem 1rem', background: isActive ? '#141D2A' : 'transparent',
              border: 'none', cursor: 'pointer', transition: 'background 0.15s',
              textAlign: 'left',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#0F1620'; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
          >
            <Avatar name={u.label} color={user?.color || '#3B82F6'} size="sm" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0' }}>{u.label}</div>
              <div style={{ fontSize: '0.7rem', color: '#475569' }}>{u.sub}</div>
            </div>
            {isActive && <Check size={14} color="#10B981" />}
          </button>
        );
      })}
    </div>
  );
}
