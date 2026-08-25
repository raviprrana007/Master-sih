import { UserPlus, CheckCircle, Clock, MessageCircle } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { SkillTag } from '../ui/Badge';
import { useApp } from '../../context/AppContext';
import { getMatchColor } from '../../utils/formatters';

export function ConnectionCard({ person }) {
  const { connectPerson, getConnectionStatus } = useApp();
  const status = getConnectionStatus(person.id) || person.connectionStatus;

  const roleColors = {
    recruiter: '#06B6D4', mentor: '#10B981', student: '#8B5CF6', academician: '#F59E0B',
  };
  const roleColor = roleColors[person.role] || '#3B82F6';

  return (
    <div className="card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: '0.875rem' }}>
        <Avatar name={person.name} color={person.color} size="lg" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{person.name}</div>
            <div style={{
              fontSize: '0.65rem', fontWeight: 600, color: getMatchColor(person.relevanceScore),
              background: `${getMatchColor(person.relevanceScore)}15`,
              padding: '2px 6px', borderRadius: 4, flexShrink: 0,
            }}>
              {person.relevanceScore}% match
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{person.title}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {person.company || person.institution}
          </div>
          <span style={{
            display: 'inline-block', marginTop: 4,
            padding: '1px 6px', borderRadius: 4, fontSize: '0.65rem', fontWeight: 600,
            background: `${roleColor}15`, color: roleColor, border: `1px solid ${roleColor}30`,
            textTransform: 'capitalize',
          }}>
            {person.role}
          </span>
        </div>
      </div>

      {/* Relevance reasons */}
      <div style={{ marginBottom: '0.875rem' }}>
        {person.relevanceReasons.slice(0, 2).map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#3B82F6', flexShrink: 0 }} />
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{r}</span>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: '0.875rem' }}>
        {person.skills.slice(0, 3).map(s => <SkillTag key={s} skill={s} />)}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 6 }}>
        {status === 'connected' ? (
          <>
            <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}>
              <CheckCircle size={13} color="#10B981" /> Connected
            </button>
            <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}>
              <MessageCircle size={13} /> Message
            </button>
          </>
        ) : status === 'pending' ? (
          <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}>
            <Clock size={13} /> Pending
          </button>
        ) : (
          <button
            onClick={() => connectPerson(person.id)}
            className="btn-primary"
            style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
          >
            <UserPlus size={13} /> Connect
          </button>
        )}
      </div>
    </div>
  );
}
