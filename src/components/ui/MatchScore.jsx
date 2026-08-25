import { getMatchColor } from '../../utils/formatters';

export function MatchScore({ score, size = 'sm' }) {
  const color = getMatchColor(score);
  const sizes = { sm: 36, md: 48, lg: 60 };
  const s = sizes[size] || 36;
  const stroke = size === 'lg' ? 4 : 3;
  const radius = (s - stroke * 2) / 2;
  const circ = 2 * Math.PI * radius;
  const dash = (score / 100) * circ;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <svg width={s} height={s} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={s / 2} cy={s / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <circle
          cx={s / 2} cy={s / 2} r={radius} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
      </svg>
      <span style={{ fontSize: size === 'lg' ? '1.1rem' : '0.875rem', fontWeight: 700, color }}>
        {score}%
      </span>
    </div>
  );
}
