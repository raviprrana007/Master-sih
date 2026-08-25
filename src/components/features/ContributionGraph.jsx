import { useState } from 'react';
import { generateContributions, getTotalContributions } from '../../data/contributions';

const COLOR_LEVELS = [
  '#1e293b', '#1e3a5f', '#1d4ed8', '#3B82F6', '#60a5fa',
];

function getColorForCount(count) {
  if (count === 0) return COLOR_LEVELS[0];
  if (count <= 2) return COLOR_LEVELS[1];
  if (count <= 4) return COLOR_LEVELS[2];
  if (count <= 6) return COLOR_LEVELS[3];
  return COLOR_LEVELS[4];
}

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function ContributionGraph({ userId = 'student-1' }) {
  const [tooltip, setTooltip] = useState(null);
  const data = generateContributions(userId);
  const total = getTotalContributions(userId);

  // Get month labels
  const monthLabels = [];
  data.forEach((week, wi) => {
    const firstDay = week[0];
    if (firstDay) {
      const d = new Date(firstDay.date);
      const month = d.getMonth();
      if (wi === 0 || (wi > 0 && new Date(data[wi - 1][0].date).getMonth() !== month)) {
        monthLabels.push({ index: wi, label: MONTHS[month] });
      }
    }
  });

  return (
    <div className="card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>
          Activity Graph
        </h3>
        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
          {total} contributions this year
        </span>
      </div>

      <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
        <div style={{ minWidth: 'max-content' }}>
          {/* Month labels */}
          <div style={{ display: 'flex', marginLeft: 28, marginBottom: 4 }}>
            {data.map((_, wi) => {
              const ml = monthLabels.find(m => m.index === wi);
              return (
                <div key={wi} style={{ width: 11, flexShrink: 0, fontSize: '0.6rem', color: '#475569' }}>
                  {ml ? ml.label : ''}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div style={{ display: 'flex', gap: 2 }}>
            {/* Day labels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 4 }}>
              {DAY_LABELS.map((d, i) => (
                <div key={i} style={{ height: 9, fontSize: '0.6rem', color: '#475569', display: 'flex', alignItems: 'center' }}>
                  {d}
                </div>
              ))}
            </div>

            {data.map((week, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {week.map((day, di) => (
                  <div
                    key={di}
                    style={{
                      width: 9, height: 9, borderRadius: 2,
                      background: getColorForCount(day.count),
                      cursor: 'pointer', flexShrink: 0,
                      transition: 'transform 0.1s',
                      position: 'relative',
                    }}
                    title={`${day.date}: ${day.count} contributions`}
                    onMouseEnter={(e) => setTooltip({ day, x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '0.65rem', color: '#475569' }}>Less</span>
            {COLOR_LEVELS.map((c, i) => (
              <div key={i} style={{ width: 9, height: 9, borderRadius: 2, background: c }} />
            ))}
            <span style={{ fontSize: '0.65rem', color: '#475569' }}>More</span>
          </div>
        </div>
      </div>

      {tooltip && (
        <div style={{
          position: 'fixed', left: tooltip.x + 12, top: tooltip.y - 30,
          background: '#0A0F18', border: '1px solid #1e293b',
          borderRadius: 6, padding: '4px 8px', fontSize: '0.7rem',
          color: '#e2e8f0', zIndex: 9999, pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}>
          {tooltip.day.count} contribution{tooltip.day.count !== 1 ? 's' : ''} on {tooltip.day.date}
        </div>
      )}
    </div>
  );
}
