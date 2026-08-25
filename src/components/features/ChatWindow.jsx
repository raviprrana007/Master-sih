import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Phone, Video } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export function ChatWindow({ conversation, onBack }) {
  const { messages, sendMessage } = useApp();
  const { currentUser } = useAuth();
  const [text, setText] = useState('');
  const bottomRef = useRef(null);
  const convMessages = messages[conversation.id] || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convMessages]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(conversation.id, text.trim());
    setText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '1rem',
        borderBottom: '1px solid #1e293b', background: '#101722',
      }}>
        {onBack && (
          <button onClick={onBack} className="btn-ghost" style={{ padding: 4 }}>
            <ArrowLeft size={18} />
          </button>
        )}
        <Avatar name={conversation.participant.name} color={conversation.participant.color} size="md" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>
            {conversation.participant.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: conversation.online ? '#10B981' : '#475569',
            }} />
            <span style={{ fontSize: '0.7rem', color: conversation.online ? '#34d399' : '#475569' }}>
              {conversation.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-ghost" style={{ padding: 6 }}><Phone size={16} /></button>
          <button className="btn-ghost" style={{ padding: 6 }}><Video size={16} /></button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {convMessages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: msg.isOwn ? 'row-reverse' : 'row',
              gap: 8, alignItems: 'flex-end',
            }}
          >
            {!msg.isOwn && (
              <Avatar name={conversation.participant.name} color={conversation.participant.color} size="sm" />
            )}
            <div style={{ maxWidth: '70%' }}>
              <div style={{
                padding: '0.625rem 0.875rem', borderRadius: msg.isOwn ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                background: msg.isOwn ? '#3B82F6' : '#141D2A',
                border: msg.isOwn ? 'none' : '1px solid #1e293b',
                fontSize: '0.875rem', color: '#e2e8f0', lineHeight: 1.5,
              }}>
                {msg.content}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#334155', marginTop: 4, textAlign: msg.isOwn ? 'right' : 'left' }}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '1rem', borderTop: '1px solid #1e293b',
        display: 'flex', gap: 8, alignItems: 'flex-end',
      }}>
        <input
          className="input"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
          placeholder={`Message ${conversation.participant.name}...`}
          style={{ flex: 1 }}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="btn-primary"
          style={{ padding: '0.5rem', borderRadius: '0.5rem', opacity: text.trim() ? 1 : 0.5 }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
