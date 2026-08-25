export function StatCard({ label, value, sub, icon: Icon, color = '#3B82F6', trend = null }) {
  return (
    <div className="stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: -10, right: -10, width: 60, height: 60,
        borderRadius: '50%', background: `${color}10`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {Icon && <Icon size={20} color={color} />}
      </div>
      <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
          {value}
        </span>
        {trend && (
          <span style={{ fontSize: '0.75rem', color: trend > 0 ? '#10B981' : '#EF4444', fontWeight: 600 }}>
            {trend > 0 ? '↑' : '↓'}{Math.abs(trend)}%
          </span>
        )}
      </div>
      {sub && <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{sub}</span>}
    </div>
  );
}
