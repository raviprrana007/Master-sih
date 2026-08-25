import { getInitials } from '../../utils/formatters';

export function Avatar({ name, color = '#3B82F6', size = 'md', src = null }) {
  const sizes = {
    xs: { box: 24, font: '0.6rem' },
    sm: { box: 32, font: '0.75rem' },
    md: { box: 40, font: '0.875rem' },
    lg: { box: 48, font: '1rem' },
    xl: { box: 64, font: '1.25rem' },
    '2xl': { box: 80, font: '1.5rem' },
  };
  const s = sizes[size] || sizes.md;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{ width: s.box, height: s.box, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
    );
  }

  return (
    <div
      style={{
        width: s.box, height: s.box, borderRadius: '50%',
        background: `${color}20`,
        border: `1.5px solid ${color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, color: color, fontWeight: 600, fontSize: s.font,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {getInitials(name)}
    </div>
  );
}
