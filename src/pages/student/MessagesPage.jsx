import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatWindow } from '../../components/features/ChatWindow';
import { Avatar } from '../../components/ui/Avatar';

export default function MessagesPage() {
  const { conversations } = useApp();
  const [selectedConv, setSelectedConv] = useState(conversations[0] || null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showChat, setShowChat] = useState(false);

  const handleSelect = (conv) => {
    setSelectedConv(conv);
    setShowChat(true);
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 120px)', minHeight: 500, gap: '1rem' }}>
      {/* Conversation list */}
      <div style={{
        width: isMobile ? '100%' : 320, flexShrink: 0,
        display: isMobile && showChat ? 'none' : 'flex',
        flexDirection: 'column',
        background: '#101722', border: '1px solid #1e293b', borderRadius: '0.75rem',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #1e293b' }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Messages</h2>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => handleSelect(conv)}
              style={{
                width: '100%', display: 'flex', gap: 10, alignItems: 'center',
                padding: '0.875rem 1rem', border: 'none', cursor: 'pointer',
                background: selectedConv?.id === conv.id ? '#1A2333' : 'transparent',
                borderBottom: '1px solid #1e293b30',
                transition: 'background 0.15s', textAlign: 'left',
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <Avatar name={conv.participant.name} color={conv.participant.color} size="md" />
                {conv.online && (
                  <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 10, height: 10, borderRadius: '50%',
                    background: '#10B981', border: '2px solid #101722',
                  }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>
                    {conv.participant.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#475569' }}>{conv.lastTime}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {conv.lastMessage}
                </div>
              </div>
              {conv.unread > 0 && (
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', background: '#3B82F6',
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

      {/* Chat window */}
      <div style={{
        flex: 1, display: isMobile && !showChat ? 'none' : 'flex',
        flexDirection: 'column',
        background: '#101722', border: '1px solid #1e293b', borderRadius: '0.75rem',
        overflow: 'hidden',
      }}>
        {selectedConv ? (
          <ChatWindow
            conversation={selectedConv}
            onBack={isMobile ? () => setShowChat(false) : undefined}
          />
        ) : (
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#475569', fontSize: '0.875rem',
          }}>
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
