import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const ICONS = { success: CheckCircle, error: XCircle, info: Info, warning: AlertTriangle };
const COLORS = { success: '#10B981', error: '#EF4444', info: '#3B82F6', warning: '#F59E0B' };

export function Toast({ id, message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const Icon = ICONS[type];
  const color = COLORS[type];

  return (
    <div
      className="animate-slide-up"
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: '#141D2A', border: `1px solid ${color}30`,
        borderRadius: '0.75rem', padding: '0.875rem 1rem',
        boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px ${color}20`,
        minWidth: 280, maxWidth: 400,
      }}
    >
      <Icon size={18} color={color} style={{ flexShrink: 0 }} />
      <span style={{ fontSize: '0.875rem', color: '#e2e8f0', flex: 1 }}>{message}</span>
      <button
        onClick={() => onClose(id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 0 }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onClose }) {
  return (
    <div style={{
      position: 'fixed', bottom: 80, right: 24, zIndex: 2000,
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      {toasts.map(t => <Toast key={t.id} {...t} onClose={onClose} />)}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const closeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return { toasts, showToast, closeToast };
}
