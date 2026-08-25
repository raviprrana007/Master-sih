import { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Share2, Send } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const TYPE_COLORS = {
  achievement: { bg: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: 'rgba(245,158,11,0.2)' },
  hiring: { bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.2)' },
  research: { bg: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: 'rgba(139,92,246,0.2)' },
  advice: { bg: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: 'rgba(59,130,246,0.2)' },
  project: { bg: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: 'rgba(6,182,212,0.2)' },
};

export function PostCard({ post }) {
  const { togglePostLike, togglePostSave, addComment } = useApp();
  const { currentUser } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);

  const typeStyle = TYPE_COLORS[post.type] || TYPE_COLORS.advice;

  const handleComment = () => {
    if (!commentText.trim()) return;
    addComment(post.id, commentText.trim());
    setCommentText('');
  };

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card" style={{ padding: '1.25rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: '0.875rem' }}>
        <Avatar name={post.author.name} color={post.author.color} size="md" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>
              {post.author.name}
            </span>
            <span style={{
              padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 500,
              background: typeStyle.bg, color: typeStyle.color, border: `1px solid ${typeStyle.border}`,
            }}>
              {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {post.author.title} • {post.timestamp}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.7,
        marginBottom: '1rem', whiteSpace: 'pre-line',
      }}>
        {post.content}
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingBottom: '0.75rem', borderBottom: '1px solid #1e293b', marginBottom: '0.75rem',
      }}>
        <span style={{ fontSize: '0.75rem', color: '#475569' }}>
          {post.likes + (post.likedByMe ? 1 : 0)} likes
        </span>
        <button
          onClick={() => setShowComments(p => !p)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: '#475569' }}
        >
          {post.comments.length} comments
        </button>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 4 }}>
        <button
          onClick={() => togglePostLike(post.id)}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '0.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
            background: post.likedByMe ? 'rgba(239,68,68,0.1)' : 'transparent',
            color: post.likedByMe ? '#f87171' : '#64748b',
            fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.2s',
          }}
        >
          <Heart size={15} fill={post.likedByMe ? '#f87171' : 'none'} />
          Like
        </button>
        <button
          onClick={() => setShowComments(p => !p)}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '0.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
            background: 'transparent', color: '#64748b', fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#141D2A'; e.currentTarget.style.color = '#e2e8f0'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; }}
        >
          <MessageCircle size={15} />
          Comment
        </button>
        <button
          onClick={() => togglePostSave(post.id)}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '0.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
            background: post.saved ? 'rgba(59,130,246,0.1)' : 'transparent',
            color: post.saved ? '#3B82F6' : '#64748b',
            fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.2s',
          }}
        >
          <Bookmark size={15} fill={post.saved ? '#3B82F6' : 'none'} />
          Save
        </button>
        <button
          onClick={handleShare}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '0.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
            background: 'transparent', color: copied ? '#10B981' : '#64748b',
            fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.2s',
          }}
        >
          <Share2 size={15} />
          {copied ? 'Copied!' : 'Share'}
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div style={{ marginTop: '0.875rem', borderTop: '1px solid #1e293b', paddingTop: '0.875rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '0.875rem' }}>
            {post.comments.map(c => (
              <div key={c.id} style={{ display: 'flex', gap: 8 }}>
                <Avatar name={c.author} color={c.color || '#3B82F6'} size="sm" />
                <div style={{
                  flex: 1, background: '#0A0F18', borderRadius: '0.5rem',
                  padding: '0.5rem 0.75rem', border: '1px solid #1e293b',
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>
                    {c.author} <span style={{ fontWeight: 400, color: '#475569', fontSize: '0.7rem' }}>• {c.time}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{c.content}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Avatar name={currentUser?.name || 'You'} color={currentUser?.color || '#3B82F6'} size="sm" />
            <div style={{ flex: 1, display: 'flex', gap: 6 }}>
              <input
                className="input"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleComment()}
                placeholder="Write a comment..."
                style={{ flex: 1 }}
              />
              <button onClick={handleComment} className="btn-primary" style={{ padding: '0.5rem' }}>
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
