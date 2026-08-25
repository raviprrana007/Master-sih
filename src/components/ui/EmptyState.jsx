export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 16, padding: '3rem 2rem', textAlign: 'center',
    }}>
      {Icon && (
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={28} color="#3B82F6" />
        </div>
      )}
      <div>
        <h3 style={{ margin: '0 0 8px', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>{title}</h3>
        {description && <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>{description}</p>}
      </div>
      {action}
    </div>
  );
}
