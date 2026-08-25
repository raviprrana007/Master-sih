import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../../components/ui/Avatar';
import { Bell, Lock, Palette, Globe, Shield, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const [notifSettings, setNotifSettings] = useState({
    emailDigest: true,
    newConnections: true,
    messages: true,
    jobAlerts: true,
    systemUpdates: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'everyone',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const TABS = [
    { id: 'profile', label: 'Profile', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>Settings</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Manage your account preferences</p>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {/* Sidebar */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <div className="card" style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'flex', gap: 8, alignItems: 'center', padding: '0.625rem 0.75rem',
                  borderRadius: 6, border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: activeTab === t.id ? 'rgba(59,130,246,0.1)' : 'transparent',
                  color: activeTab === t.id ? '#60a5fa' : '#94a3b8',
                  fontSize: '0.875rem', fontWeight: activeTab === t.id ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                <t.icon size={16} />
                {t.label}
              </button>
            ))}
            <div style={{ height: 1, background: '#1e293b', margin: '4px 0' }} />
            <button
              onClick={logout}
              style={{
                display: 'flex', gap: 8, alignItems: 'center', padding: '0.625rem 0.75rem',
                borderRadius: 6, border: 'none', cursor: 'pointer', textAlign: 'left',
                background: 'transparent', color: '#EF4444', fontSize: '0.875rem',
              }}
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {activeTab === 'profile' && (
            <>
              <div className="card" style={{ padding: '1.5rem' }}>
                <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Profile Information</h2>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: '1.5rem' }}>
                  <Avatar name={currentUser?.name} color={currentUser?.color} size="xl" />
                  <div>
                    <button className="btn-primary" style={{ background: '#3B82F6', fontSize: '0.8rem' }}>Change Photo</button>
                    <p style={{ margin: '6px 0 0', fontSize: '0.75rem', color: '#64748b' }}>JPG, PNG up to 2MB</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    { label: 'Full Name', value: currentUser?.name || '' },
                    { label: 'Email', value: currentUser?.email || '' },
                    { label: 'Department', value: currentUser?.department || '' },
                    { label: 'Institution', value: currentUser?.institution || 'KIIT University' },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>{f.label}</label>
                      <input
                        defaultValue={f.value}
                        style={{ width: '100%', padding: '8px 12px', background: '#0A0F18', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0', fontSize: '0.875rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>About</label>
                  <textarea
                    defaultValue={currentUser?.about || ''}
                    rows={3}
                    style={{ width: '100%', padding: '8px 12px', background: '#0A0F18', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0', fontSize: '0.875rem', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Change Password</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {['Current Password', 'New Password', 'Confirm New Password'].map(f => (
                    <div key={f}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>{f}</label>
                      <input type="password" style={{ width: '100%', padding: '8px 12px', background: '#0A0F18', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0', fontSize: '0.875rem', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Notification Preferences</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { key: 'emailDigest', label: 'Weekly Email Digest', desc: 'Get a weekly summary of activity' },
                  { key: 'newConnections', label: 'New Connections', desc: 'When someone connects with you' },
                  { key: 'messages', label: 'Messages', desc: 'When you receive new messages' },
                  { key: 'jobAlerts', label: 'Job & Internship Alerts', desc: 'New opportunities matching your profile' },
                  { key: 'systemUpdates', label: 'System Updates', desc: 'Platform updates and announcements' },
                ].map((item, i) => (
                  <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderTop: i > 0 ? '1px solid #1e293b' : 'none' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#e2e8f0' }}>{item.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.desc}</div>
                    </div>
                    <button
                      onClick={() => setNotifSettings(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                      style={{
                        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                        background: notifSettings[item.key] ? '#3B82F6' : '#1e293b',
                        position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                      }}
                    >
                      <span style={{
                        position: 'absolute', top: 2, left: notifSettings[item.key] ? 22 : 2,
                        width: 20, height: 20, borderRadius: '50%', background: 'white', transition: 'left 0.2s',
                      }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Privacy Settings</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{ padding: '1rem 0' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#e2e8f0', marginBottom: 4 }}>Profile Visibility</label>
                  <select
                    value={privacySettings.profileVisibility}
                    onChange={e => setPrivacySettings(p => ({ ...p, profileVisibility: e.target.value }))}
                    style={{ padding: '8px 12px', background: '#0A0F18', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0', fontSize: '0.875rem' }}
                  >
                    <option value="everyone">Everyone</option>
                    <option value="connections">Connections only</option>
                    <option value="institution">My institution</option>
                  </select>
                </div>
                {[
                  { key: 'showEmail', label: 'Show Email on Profile', desc: 'Others can see your email address' },
                  { key: 'showPhone', label: 'Show Phone Number', desc: 'Others can see your phone number' },
                  { key: 'allowMessages', label: 'Allow Direct Messages', desc: 'Anyone can message you' },
                ].map((item, i) => (
                  <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderTop: '1px solid #1e293b' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#e2e8f0' }}>{item.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.desc}</div>
                    </div>
                    <button
                      onClick={() => setPrivacySettings(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                      style={{
                        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                        background: privacySettings[item.key] ? '#3B82F6' : '#1e293b',
                        position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                      }}
                    >
                      <span style={{
                        position: 'absolute', top: 2, left: privacySettings[item.key] ? 22 : 2,
                        width: 20, height: 20, borderRadius: '50%', background: 'white', transition: 'left 0.2s',
                      }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Appearance</h2>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#e2e8f0', marginBottom: 12 }}>Theme</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {[
                    { id: 'dark', label: 'Dark', bg: '#05070D', accent: '#3B82F6' },
                    { id: 'darker', label: 'Midnight', bg: '#000000', accent: '#8B5CF6' },
                    { id: 'dim', label: 'Dim', bg: '#141D2A', accent: '#10B981' },
                  ].map(t => (
                    <div
                      key={t.id}
                      style={{
                        width: 80, height: 60, borderRadius: 10, background: t.bg,
                        border: t.id === 'dark' ? `2px solid ${t.accent}` : '2px solid #1e293b',
                        cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                        padding: 6, gap: 4,
                      }}
                    >
                      <div style={{ height: 8, borderRadius: 4, background: t.accent, width: '60%' }} />
                      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)', width: '80%' }} />
                      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', width: '70%' }} />
                      <div style={{ fontSize: '0.6rem', color: '#64748b', textAlign: 'center', marginTop: 'auto' }}>{t.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#e2e8f0', marginBottom: 8 }}>Font Size</label>
                <input type="range" min="12" max="18" defaultValue="14" style={{ width: '100%', accentColor: '#3B82F6' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>
                  <span>Small</span><span>Default</span><span>Large</span>
                </div>
              </div>
            </div>
          )}

          {/* Save button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSave}
              className="btn-primary"
              style={{ background: saved ? '#10B981' : '#3B82F6', minWidth: 120 }}
            >
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
