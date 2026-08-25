import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatWindow } from '../../components/features/ChatWindow';
import { Avatar } from '../../components/ui/Avatar';
import { useBreakpoint } from '../../hooks/useBreakpoint';

export default function MessagesPage() {
  const { conversations } = useApp();
  const { isMobile } = useBreakpoint();
  const [selectedConv, setSelectedConv] = useState(conversations[0] || null);
  const [showChat, setShowChat] = useState(false);

  const handleSelect = (conv) => {
    setSelectedConv(conv);
    setShowChat(true);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '300px 1fr',
      height: `calc(100dvh - 120px)`,
      minHeight: 400,
      border: '1px solid var(--border)',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      {/* Conversation list - hide on mobile when chat is open */}
      {(!isMobile || !showChat) && (
        <div style={{
          borderRight: isMobile ? 'none' : '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          background: 'var(--surface)', overflow: 'hidden',
        }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-1)' }}>Messages</h2>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => handleSelect(conv)}
                style={{
                  width: '100%', display: 'flex', gap: 10, alignItems: 'center',
                  padding: '0.875rem 1rem', border: 'none', cursor: 'pointer',
                  background: selectedConv?.id === conv.id ? 'var(--surface-el)' : 'transparent',
                  borderBottom: '1px solid var(--border)',
                  transition: 'background 0.15s', textAlign: 'left',
                }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <Avatar name={conv.participant.name} color={conv.participant.color} size="md" />
                  {conv.online && (
                    <div style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 10, height: 10, borderRadius: '50%',
                      background: '#10B981', border: '2px solid var(--surface)',
                    }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {conv.participant.name}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-3)', flexShrink: 0, marginLeft: 8 }}>{conv.lastTime}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {conv.lastMessage}
                  </div>
                </div>
                {conv.unread > 0 && (
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', background: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 700, color: 'white', flexShrink: 0,
                  }}>
                    {conv.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat window - full width on mobile when open */}
      {(!isMobile || showChat) && (
        <div style={{
          display: 'flex', flexDirection: 'column',
          background: 'var(--surface)', overflow: 'hidden',
        }}>
          {selectedConv ? (
            <ChatWindow
              conversation={selectedConv}
              onBack={isMobile ? () => setShowChat(false) : undefined}
            />
          ) : (
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-3)', fontSize: '0.875rem',
            }}>
              Select a conversation to start chatting
            </div>
          )}
        </div>
      )}
    </div>
  );
}
