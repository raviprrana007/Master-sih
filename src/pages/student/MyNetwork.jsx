import { useApp } from '../../context/AppContext';
import { PEOPLE } from '../../data/people';
import { Avatar } from '../../components/ui/Avatar';
import { Check, X, MessageCircle } from 'lucide-react';
import { EmptyState } from '../../components/ui/EmptyState';
import { Users } from 'lucide-react';

export default function MyNetwork() {
  const { connections, acceptConnection, connectPerson } = useApp();

  const connected = PEOPLE.filter(p => connections[p.id] === 'connected' || p.connectionStatus === 'connected');
  const pending = PEOPLE.filter(p => connections[p.id] === 'pending' || p.connectionStatus === 'pending');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
          My Network
        </h1>
        <p style={{ margin: 0, color: '#64748b' }}>{connected.length} connections • {pending.length} pending</p>
      </div>

      {pending.length > 0 && (
        <div>
          <h2 style={{ margin: '0 0 0.875rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>
            Pending Requests ({pending.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pending.map(p => (
              <div key={p.id} className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name={p.name} color={p.color} size="md" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{p.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.title} • {p.company || p.institution}</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => acceptConnection(p.id)} className="btn-primary" style={{ padding: '0.375rem 0.875rem', fontSize: '0.8rem' }}>
                    <Check size={13} /> Accept
                  </button>
                  <button className="btn-secondary" style={{ padding: '0.375rem 0.875rem', fontSize: '0.8rem' }}>
                    <X size={13} /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 style={{ margin: '0 0 0.875rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>
          Connections ({connected.length})
        </h2>
        {connected.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {connected.map(p => (
              <div key={p.id} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: '0.875rem' }}>
                  <Avatar name={p.name} color={p.color} size="lg" />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{p.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.company || p.institution}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: '0.875rem' }}>
                  {p.skills.slice(0, 3).map(s => (
                    <span key={s} style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem', background: 'rgba(59,130,246,0.08)', color: '#94a3b8', border: '1px solid rgba(59,130,246,0.15)' }}>
                      {s}
                    </span>
                  ))}
                </div>
                <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
                  <MessageCircle size={13} /> Message
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Users}
            title="No connections yet"
            description="Discover people to grow your professional network"
          />
        )}
      </div>
    </div>
  );
}
