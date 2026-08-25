import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { ROLE_CREDENTIALS } from '../../data/users';

const ROLES = [
  { key: 'student', label: 'Student', color: '#3B82F6', desc: 'Find internships & grow skills' },
  { key: 'industry', label: 'Industry', color: '#06B6D4', desc: 'Discover & hire top talent' },
  { key: 'academician', label: 'Academician', color: '#10B981', desc: 'Research, mentor & collaborate' },
  { key: 'institution', label: 'Institution', color: '#F59E0B', desc: 'Track placements & analytics' },
];

const STATS = [
  { label: 'Career Readiness', value: '82%', color: '#3B82F6' },
  { label: 'Skill Match', value: '94%', color: '#10B981' },
  { label: 'Network', value: '127', color: '#8B5CF6' },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState(ROLE_CREDENTIALS.student.email);
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roleData = ROLES.find(r => r.key === selectedRole);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError('');
    const creds = ROLE_CREDENTIALS[role] || ROLE_CREDENTIALS.student;
    setEmail(creds.email);
    setPassword('demo123');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 500));
    const creds = Object.values(ROLE_CREDENTIALS).find(c => c.email === email);
    if (creds && password === 'demo123') {
      login(creds.userId);
      navigate('/');
    } else {
      setError('Invalid credentials. Use the demo credentials shown below.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: '#05070D', fontFamily: 'Inter, sans-serif',
    }}>
      {/* Left panel */}
      <div style={{
        flex: '0 0 55%', position: 'relative',
        background: 'linear-gradient(135deg, #05070D 0%, #0A0F18 50%, #0D1520 100%)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '3rem',
      }}
        className="grid-pattern"
      >
        {/* Glow effects */}
        <div style={{
          position: 'absolute', top: '20%', left: '20%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '20%',
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 480 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '2rem' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={24} color="#3B82F6" />
            </div>
            <span style={{
              fontSize: '2rem', fontWeight: 800, color: '#e2e8f0',
              fontFamily: 'Inter, sans-serif',
            }}>
              SkillBridge
            </span>
          </div>

          <h2 style={{
            fontSize: '1.75rem', fontWeight: 700, color: '#e2e8f0',
            fontFamily: 'Inter, sans-serif', margin: '0 0 0.75rem',
          }}>
            Where Talent Meets Opportunity
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', margin: '0 0 2rem', lineHeight: 1.6 }}>
            AI-powered career platform connecting students, industry, and academia for the future of work.
          </p>

          {/* Network SVG animation */}
          <div style={{ position: 'relative', height: 180, marginBottom: '2rem' }}>
            <svg width="100%" height="180" viewBox="0 0 400 180">
              {/* Lines */}
              <line x1="200" y1="90" x2="80" y2="40" stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="4,4">
                <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="90" x2="320" y2="40" stroke="rgba(139,92,246,0.3)" strokeWidth="1" strokeDasharray="4,4">
                <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="90" x2="80" y2="140" stroke="rgba(16,185,129,0.3)" strokeWidth="1" strokeDasharray="4,4">
                <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="90" x2="320" y2="140" stroke="rgba(6,182,212,0.3)" strokeWidth="1" strokeDasharray="4,4">
                <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="1.8s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="90" x2="350" y2="90" stroke="rgba(245,158,11,0.3)" strokeWidth="1" strokeDasharray="4,4">
                <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="2.2s" repeatCount="indefinite" />
              </line>
              {/* Center */}
              <circle cx="200" cy="90" r="20" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5">
                <animate attributeName="r" values="18;22;18" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="200" y="95" textAnchor="middle" fill="#3B82F6" fontSize="12" fontWeight="600">SB</text>
              {/* Nodes */}
              {[
                { x: 80, y: 40, c: '#3B82F6', l: 'S' },
                { x: 320, y: 40, c: '#8B5CF6', l: 'I' },
                { x: 80, y: 140, c: '#10B981', l: 'A' },
                { x: 320, y: 140, c: '#06B6D4', l: 'In' },
                { x: 350, y: 90, c: '#F59E0B', l: 'M' },
              ].map((n, i) => (
                <g key={i}>
                  <circle cx={n.x} cy={n.y} r="14" fill={`${n.c}20`} stroke={`${n.c}60`} strokeWidth="1.5">
                    <animate attributeName="r" values="12;15;12" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fill={n.c} fontSize="10" fontWeight="700">{n.l}</text>
                </g>
              ))}
            </svg>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            {STATS.map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b',
                borderRadius: '0.75rem', padding: '0.75rem 1rem', textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: s.color, fontFamily: 'Inter, sans-serif' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#475569' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        flex: '0 0 45%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', background: '#0A0F18',
        borderLeft: '1px solid #1e293b',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
            Welcome back
          </h2>
          <p style={{ margin: '0 0 2rem', fontSize: '0.875rem', color: '#64748b' }}>
            Sign in to your SkillBridge account
          </p>

          {/* Role selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Sign in as
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {ROLES.map(role => (
                <button
                  key={role.key}
                  onClick={() => handleRoleSelect(role.key)}
                  style={{
                    padding: '0.625rem 0.75rem', borderRadius: '0.5rem',
                    border: `1px solid ${selectedRole === role.key ? role.color : '#1e293b'}`,
                    background: selectedRole === role.key ? `${role.color}10` : 'transparent',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: selectedRole === role.key ? role.color : '#94a3b8' }}>
                    {role.label}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#475569', marginTop: 2 }}>{role.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                Email
              </label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{ paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  style={{
                    position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#64748b',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                padding: '0.625rem 0.875rem', borderRadius: '0.5rem',
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                fontSize: '0.8rem', color: '#f87171',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%', justifyContent: 'center', padding: '0.75rem',
                fontSize: '0.9375rem', borderRadius: '0.625rem',
                background: roleData?.color || '#3B82F6',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Signing in...' : (
                <>Sign in as {roleData?.label} <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div style={{
            marginTop: '1.5rem', padding: '0.875rem',
            background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)',
            borderRadius: '0.75rem',
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3B82F6', marginBottom: 6 }}>
              Demo Credentials (auto-filled)
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
              Email: {email}<br />
              Password: demo123
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 768px) {
          .login-panels { flex-direction: column !important; }
          .login-left { flex: none !important; padding: 2rem !important; }
          .login-right { flex: none !important; }
        }
      `}</style>
    </div>
  );
}
