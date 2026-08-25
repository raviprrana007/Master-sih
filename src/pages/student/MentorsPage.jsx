import { PEOPLE } from '../../data/people';
import { ConnectionCard } from '../../components/features/ConnectionCard';

export default function MentorsPage() {
  const mentors = PEOPLE.filter(p => p.role === 'mentor');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
          Mentors
        </h1>
        <p style={{ margin: 0, color: '#64748b' }}>Industry professionals available to guide your career journey</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {mentors.map(p => <ConnectionCard key={p.id} person={p} />)}
      </div>
    </div>
  );
}
