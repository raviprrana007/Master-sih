export function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4, background: '#0A0F18', padding: 4, borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          style={{
            padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none',
            cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500,
            transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
            background: active === tab.value ? '#141D2A' : 'transparent',
            color: active === tab.value ? '#e2e8f0' : '#64748b',
            boxShadow: active === tab.value ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span style={{
              marginLeft: 6, background: active === tab.value ? '#3B82F6' : '#1e293b',
              color: active === tab.value ? 'white' : '#94a3b8',
              padding: '1px 6px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 600,
            }}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
