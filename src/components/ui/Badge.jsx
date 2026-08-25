export function Badge({ children, variant = 'blue', className = '' }) {
  return <span className={`badge badge-${variant} ${className}`}>{children}</span>;
}

export function SkillTag({ skill }) {
  return (
    <span style={{
      background: 'rgba(59,130,246,0.08)',
      border: '1px solid rgba(59,130,246,0.2)',
      color: '#94a3b8',
      padding: '0.125rem 0.5rem',
      borderRadius: '0.25rem',
      fontSize: '0.75rem',
      fontWeight: 500,
    }}>
      {skill}
    </span>
  );
}
