import { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children, width = '600px' }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="animate-slide-up"
        style={{
          background: '#141D2A', border: '1px solid #1e293b',
          borderRadius: '1rem', width: '100%', maxWidth: width,
          maxHeight: '90vh', overflow: 'auto',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {title && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e293b',
          }}>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>{title}</h2>
            <button onClick={onClose} className="btn-ghost" style={{ padding: '4px', borderRadius: '6px' }}>
              <X size={18} />
            </button>
          </div>
        )}
        <div style={{ padding: '1.5rem' }}>{children}</div>
      </div>
    </div>
  );
}
