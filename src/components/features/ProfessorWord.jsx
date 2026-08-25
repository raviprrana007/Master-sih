import { useState } from 'react';
import { Heart, GraduationCap } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

export function ProfessorWordCard({ word }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(word.likes || 0);

  const handleLike = () => {
    setLiked(prev => !prev);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: '0.875rem' }}>
        <Avatar name={word.professor} color={word.color} size="md" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{word.professor}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {word.department} • {word.institution}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <GraduationCap size={12} color={word.color} />
            <span style={{ fontSize: '0.7rem', color: word.color, fontWeight: 500 }}>{word.topic}</span>
          </div>
        </div>
        <span style={{ fontSize: '0.7rem', color: '#334155', flexShrink: 0 }}>{word.date}</span>
      </div>

      <blockquote style={{
        margin: '0 0 1rem', padding: '0.75rem 1rem',
        borderLeft: `3px solid ${word.color}`,
        background: `${word.color}08`,
        borderRadius: '0 0.5rem 0.5rem 0',
        fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6,
        fontStyle: 'italic',
      }}>
        "{word.message}"
      </blockquote>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={handleLike}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: liked ? 'rgba(239,68,68,0.1)' : 'transparent',
            border: liked ? '1px solid rgba(239,68,68,0.2)' : '1px solid transparent',
            borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
            color: liked ? '#f87171' : '#64748b', fontSize: '0.75rem',
            transition: 'all 0.2s',
          }}
        >
          <Heart size={14} fill={liked ? '#f87171' : 'none'} color={liked ? '#f87171' : '#64748b'} />
          {likes}
        </button>
        <div style={{
          fontSize: '0.65rem', color: '#334155', fontFamily: 'JetBrains Mono, monospace',
        }}>
          Words from professors
        </div>
      </div>
    </div>
  );
}
