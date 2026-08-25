export function ProgressBar({ value = 0, max = 100, color = '#3B82F6', height = 6, showLabel = false, label = '' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
          <span>{label}</span>
          <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{Math.round(pct)}%</span>
        </div>
      )}
      <div style={{
        height, borderRadius: height / 2,
        background: 'rgba(255,255,255,0.06)',
        overflow: 'hidden', width: '100%',
      }}>
        <div style={{
          height: '100%', width: `${pct}%`, borderRadius: height / 2,
          background: color,
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  );
}

export function SkillBar({ skill, value, demand, gap }) {
  const getColor = (v) => {
    if (v >= 75) return '#10B981';
    if (v >= 50) return '#3B82F6';
    if (v >= 30) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 500 }}>{skill}</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {gap !== undefined && gap > 0 && (
            <span style={{ fontSize: '0.7rem', color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '1px 6px', borderRadius: 4 }}>
              -{gap}% gap
            </span>
          )}
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{value}%</span>
        </div>
      </div>
      <div style={{ position: 'relative', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)' }}>
        {demand !== undefined && (
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: `${demand}%`, borderRadius: 3,
            background: 'rgba(239,68,68,0.15)',
          }} />
        )}
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          width: `${value}%`, borderRadius: 3,
          background: getColor(value),
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  );
}
