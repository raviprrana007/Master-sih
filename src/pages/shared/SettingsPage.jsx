import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../../components/ui/Avatar';
import { Bell, Lock, Palette, Shield, LogOut, Sun, Moon, Check, Type } from 'lucide-react';

const S = {
  label: { display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, letterSpacing: '0.02em', textTransform: 'uppercase' },
  input: {
    width: '100%', padding: '9px 12px',
    background: 'var(--input-bg)', border: '1px solid var(--border)',
    borderRadius: 8, color: 'var(--text-1)', fontSize: '0.875rem',
    boxSizing: 'border-box', outline: 'none', fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  },
  sectionTitle: { margin: '0 0 1rem', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.01em' },
  rowText: { fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-1)' },
  rowDesc: { fontSize: '0.75rem', color: 'var(--text-3)', marginTop: 2 },
  divider: { height: 1, background: 'var(--border)', margin: '0' },
};

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
        background: value ? 'var(--accent)' : 'var(--border-mid)',
        position: 'relative', transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 2, left: value ? 22 : 2,
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  );
}

function ToggleRow({ label, desc, value, onChange, border = true }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderTop: border ? '1px solid var(--border)' : 'none' }}>
      <div>
        <div style={S.rowText}>{label}</div>
        {desc && <div style={S.rowDesc}>{desc}</div>}
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  );
}

const ACCENT_OPTIONS = [
  { id: 'blue',   label: 'Blue',    color: '#2563EB', darkColor: '#3B82F6' },
  { id: 'violet', label: 'Violet',  color: '#7C3AED', darkColor: '#8B5CF6' },
  { id: 'cyan',   label: 'Cyan',    color: '#0891B2', darkColor: '#06B6D4' },
  { id: 'green',  label: 'Emerald', color: '#059669', darkColor: '#10B981' },
  { id: 'rose',   label: 'Rose',    color: '#E11D48', darkColor: '#F43F5E' },
  { id: 'amber',  label: 'Amber',   color: '#D97706', darkColor: '#F59E0B' },
];

const FONT_SIZES = [
  { id: 'sm', label: 'Small',   size: '13px' },
  { id: 'md', label: 'Default', size: '14px' },
  { id: 'lg', label: 'Large',   size: '15.5px' },
];

export default function SettingsPage() {
  const { currentUser, logout } = useAuth();
  const { theme, setTheme } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  // Appearance state — persisted to localStorage
  const [accent, setAccent] = useState(() => localStorage.getItem('sb_accent') || 'blue');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('sb_font_size') || 'md');

  const [notifSettings, setNotifSettings] = useState({
    emailDigest: true, newConnections: true, messages: true, jobAlerts: true, systemUpdates: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'everyone', showEmail: false, showPhone: false, allowMessages: true,
  });

  // Apply accent color to document root
  const applyAccent = (id) => {
    const opt = ACCENT_OPTIONS.find(o => o.id === id);
    if (!opt) return;
    const isDark = theme === 'dark';
    const color = isDark ? opt.darkColor : opt.color;
    document.documentElement.style.setProperty('--accent', color);
    document.documentElement.style.setProperty('--accent-light', `${color}18`);
    document.documentElement.style.setProperty('--accent-border', `${color}35`);
    localStorage.setItem('sb_accent', id);
    setAccent(id);
  };

  // Apply font size to document root
  const applyFontSize = (id) => {
    const opt = FONT_SIZES.find(o => o.id === id);
    if (!opt) return;
    document.documentElement.style.setProperty('--base-font-size', opt.size);
    document.documentElement.style.fontSize = opt.size;
    localStorage.setItem('sb_font_size', id);
    setFontSize(id);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const TABS = [
    { id: 'profile',       label: 'Profile',       icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy',       label: 'Privacy',        icon: Lock },
    { id: 'appearance',    label: 'Appearance',     icon: Palette },
  ];

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Settings</h1>
        <p style={{ margin: 0, color: 'var(--text-3)', fontSize: '0.875rem' }}>Manage your account preferences and appearance</p>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Tab sidebar */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <div className="card" style={{ padding: '0.375rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {TABS.map(t => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    display: 'flex', gap: 9, alignItems: 'center', padding: '0.6rem 0.75rem',
                    borderRadius: 7, border: 'none', cursor: 'pointer', textAlign: 'left',
                    background: active ? 'var(--accent-light)' : 'transparent',
                    color: active ? 'var(--accent)' : 'var(--text-2)',
                    fontSize: '0.875rem', fontWeight: active ? 600 : 400,
                    transition: 'all 0.15s', fontFamily: 'Inter, sans-serif', width: '100%',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--card-hover)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <t.icon size={15} />
                  {t.label}
                </button>
              );
            })}
            <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
            <button
              onClick={logout}
              style={{
                display: 'flex', gap: 9, alignItems: 'center', padding: '0.6rem 0.75rem',
                borderRadius: 7, border: 'none', cursor: 'pointer', textAlign: 'left',
                background: 'transparent', color: '#EF4444', fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif', width: '100%', transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <LogOut size={15} />
              Sign out
            </button>
          </div>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* ── PROFILE ── */}
          {activeTab === 'profile' && (
            <>
              <div className="card" style={{ padding: '1.5rem' }}>
                <h2 style={S.sectionTitle}>Profile Information</h2>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: '1.5rem' }}>
                  <Avatar name={currentUser?.name} color={currentUser?.color} size="xl" />
                  <div>
                    <button className="btn-primary" style={{ fontSize: '0.8rem' }}>Change Photo</button>
                    <p style={{ margin: '6px 0 0', fontSize: '0.73rem', color: 'var(--text-3)' }}>JPG, PNG up to 2MB</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    { label: 'Full Name',    value: currentUser?.name || '' },
                    { label: 'Email',        value: currentUser?.email || '' },
                    { label: 'Department',   value: currentUser?.department || '' },
                    { label: 'Institution',  value: currentUser?.institution || 'KIIT University' },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={S.label}>{f.label}</label>
                      <input defaultValue={f.value} style={S.input}
                        onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 2px var(--accent-light)'; }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <label style={S.label}>About</label>
                  <textarea
                    defaultValue={currentUser?.about || ''}
                    rows={3}
                    style={{ ...S.input, resize: 'vertical' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 2px var(--accent-light)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <h2 style={S.sectionTitle}>Change Password</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {['Current Password', 'New Password', 'Confirm New Password'].map(f => (
                    <div key={f}>
                      <label style={S.label}>{f}</label>
                      <input type="password" style={S.input}
                        onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 2px var(--accent-light)'; }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeTab === 'notifications' && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h2 style={S.sectionTitle}>Notification Preferences</h2>
              <ToggleRow border={false}
                label="Weekly Email Digest" desc="Get a weekly summary of activity"
                value={notifSettings.emailDigest}
                onChange={v => setNotifSettings(p => ({ ...p, emailDigest: v }))} />
              <ToggleRow
                label="New Connections" desc="When someone connects with you"
                value={notifSettings.newConnections}
                onChange={v => setNotifSettings(p => ({ ...p, newConnections: v }))} />
              <ToggleRow
                label="Messages" desc="When you receive new messages"
                value={notifSettings.messages}
                onChange={v => setNotifSettings(p => ({ ...p, messages: v }))} />
              <ToggleRow
                label="Job & Internship Alerts" desc="New opportunities matching your profile"
                value={notifSettings.jobAlerts}
                onChange={v => setNotifSettings(p => ({ ...p, jobAlerts: v }))} />
              <ToggleRow
                label="System Updates" desc="Platform updates and announcements"
                value={notifSettings.systemUpdates}
                onChange={v => setNotifSettings(p => ({ ...p, systemUpdates: v }))} />
            </div>
          )}

          {/* ── PRIVACY ── */}
          {activeTab === 'privacy' && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h2 style={S.sectionTitle}>Privacy Settings</h2>
              <div style={{ paddingBottom: '1rem' }}>
                <label style={S.label}>Profile Visibility</label>
                <select
                  value={privacySettings.profileVisibility}
                  onChange={e => setPrivacySettings(p => ({ ...p, profileVisibility: e.target.value }))}
                  style={{ ...S.input, width: 'auto', minWidth: 200 }}
                >
                  <option value="everyone">Everyone</option>
                  <option value="connections">Connections only</option>
                  <option value="institution">My institution</option>
                </select>
              </div>
              <ToggleRow
                label="Show Email on Profile" desc="Others can see your email address"
                value={privacySettings.showEmail}
                onChange={v => setPrivacySettings(p => ({ ...p, showEmail: v }))} />
              <ToggleRow
                label="Show Phone Number" desc="Others can see your phone number"
                value={privacySettings.showPhone}
                onChange={v => setPrivacySettings(p => ({ ...p, showPhone: v }))} />
              <ToggleRow
                label="Allow Direct Messages" desc="Anyone on the platform can message you"
                value={privacySettings.allowMessages}
                onChange={v => setPrivacySettings(p => ({ ...p, allowMessages: v }))} />
            </div>
          )}

          {/* ── APPEARANCE ── */}
          {activeTab === 'appearance' && (
            <>
              {/* Theme */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h2 style={S.sectionTitle}>Theme</h2>
                <p style={{ margin: '0 0 1rem', fontSize: '0.8125rem', color: 'var(--text-3)' }}>
                  Choose between light and dark interface
                </p>
                <div style={{ display: 'flex', gap: '0.875rem' }}>
                  {[
                    {
                      id: 'light', label: 'Light', icon: Sun,
                      bg: '#F5F7FA', surface: '#FFFFFF', border: '#DDE3ED', textCol: '#0D1117',
                    },
                    {
                      id: 'dark', label: 'Dark', icon: Moon,
                      bg: '#05070D', surface: '#101722', border: '#1e293b', textCol: '#E8EDF5',
                    },
                  ].map(t => {
                    const active = theme === t.id;
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        style={{
                          flex: 1, maxWidth: 160, padding: '1rem',
                          borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                          background: t.bg,
                          border: active ? `2px solid var(--accent)` : `2px solid ${t.border}`,
                          display: 'flex', flexDirection: 'column', gap: 8,
                          transition: 'border-color 0.2s', position: 'relative',
                          boxShadow: active ? '0 0 0 3px var(--accent-light)' : 'none',
                        }}
                      >
                        {active && (
                          <div style={{
                            position: 'absolute', top: 8, right: 8,
                            width: 18, height: 18, borderRadius: '50%',
                            background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <Check size={10} color="#fff" strokeWidth={3} />
                          </div>
                        )}
                        {/* Mini preview */}
                        <div style={{ background: t.surface, borderRadius: 6, padding: '6px 8px', border: `1px solid ${t.border}` }}>
                          <div style={{ height: 6, borderRadius: 3, background: '#3B82F6', width: '55%', marginBottom: 4 }} />
                          <div style={{ height: 4, borderRadius: 2, background: t.border, width: '80%', marginBottom: 3 }} />
                          <div style={{ height: 4, borderRadius: 2, background: t.border, width: '65%' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Icon size={13} color={t.textCol} />
                          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: t.textCol }}>{t.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accent color */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h2 style={S.sectionTitle}>Accent Color</h2>
                <p style={{ margin: '0 0 1rem', fontSize: '0.8125rem', color: 'var(--text-3)' }}>
                  Used for active states, buttons, and highlights
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {ACCENT_OPTIONS.map(opt => {
                    const active = accent === opt.id;
                    const displayColor = theme === 'dark' ? opt.darkColor : opt.color;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => applyAccent(opt.id)}
                        title={opt.label}
                        style={{
                          width: 40, height: 40, borderRadius: '50%',
                          background: displayColor, border: active ? `3px solid ${displayColor}` : '3px solid transparent',
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: active ? `0 0 0 3px var(--surface), 0 0 0 5px ${displayColor}` : 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        {active && <Check size={16} color="#fff" strokeWidth={3} />}
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                  {ACCENT_OPTIONS.map(opt => (
                    <span key={opt.id} style={{
                      fontSize: '0.7rem', color: accent === opt.id ? 'var(--accent)' : 'var(--text-3)',
                      fontWeight: accent === opt.id ? 600 : 400, width: 40, textAlign: 'center',
                    }}>{opt.label}</span>
                  ))}
                </div>
              </div>

              {/* Font size */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h2 style={S.sectionTitle}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Type size={16} /> Font Size
                  </span>
                </h2>
                <p style={{ margin: '0 0 1rem', fontSize: '0.8125rem', color: 'var(--text-3)' }}>
                  Adjust the base text size across the interface
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {FONT_SIZES.map(opt => {
                    const active = fontSize === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => applyFontSize(opt.id)}
                        style={{
                          flex: 1, padding: '0.875rem', borderRadius: 10, cursor: 'pointer',
                          background: active ? 'var(--accent-light)' : 'var(--surface-el)',
                          border: active ? '1.5px solid var(--accent)' : '1.5px solid var(--border)',
                          color: active ? 'var(--accent)' : 'var(--text-2)',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                          transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        <span style={{ fontSize: opt.size, fontWeight: 700, lineHeight: 1 }}>Aa</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: active ? 600 : 400 }}>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Preview */}
                <div style={{
                  marginTop: '1rem', padding: '1rem', borderRadius: 8,
                  background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preview</div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-1)', fontWeight: 600, marginBottom: 4 }}>
                    SkillBridge Career Platform
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-2)' }}>
                    Connect skills to opportunities across academia and industry.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Save button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSave}
              className="btn-primary"
              style={{ background: saved ? '#059669' : 'var(--accent)', minWidth: 130, justifyContent: 'center' }}
            >
              {saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
