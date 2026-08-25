import { useState } from 'react';
import { Send, Image, Link } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { PostCard } from '../../components/features/PostCard';
import { Avatar } from '../../components/ui/Avatar';

const FILTERS = ['All', 'Industry', 'Academia', 'Students'];

export default function FeedPage() {
  const { posts, setPosts } = useApp();
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState('All');
  const [composing, setComposing] = useState('');

  const filtered = posts.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Industry') return p.role === 'industry';
    if (filter === 'Academia') return p.role === 'academician';
    if (filter === 'Students') return p.role === 'student';
    return true;
  });

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
          Community Feed
        </h1>
        <p style={{ margin: 0, color: '#64748b' }}>Stay updated with industry insights, opportunities, and achievements</p>
      </div>

      {/* Compose */}
      <div className="card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: composing ? '0.875rem' : 0 }}>
          <Avatar name={currentUser?.name} color={currentUser?.color} size="md" />
          <textarea
            className="input"
            value={composing}
            onChange={e => setComposing(e.target.value)}
            placeholder={`What's on your mind, ${currentUser?.name?.split(' ')[0]}?`}
            style={{ resize: 'none', minHeight: composing ? 80 : 40, transition: 'min-height 0.2s' }}
            onFocus={e => e.target.style.minHeight = '80px'}
          />
        </div>
        {composing && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-ghost" style={{ fontSize: '0.8rem' }}><Image size={14} /> Photo</button>
              <button className="btn-ghost" style={{ fontSize: '0.8rem' }}><Link size={14} /> Link</button>
            </div>
            <button className="btn-primary" style={{ fontSize: '0.8rem' }}>
              <Send size={13} /> Post
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 6 }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '0.375rem 0.875rem', borderRadius: '2rem', border: 'none',
              cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.15s',
              background: filter === f ? '#3B82F6' : '#141D2A',
              color: filter === f ? 'white' : '#94a3b8',
              border: `1px solid ${filter === f ? '#3B82F6' : '#1e293b'}`,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </div>
  );
}
