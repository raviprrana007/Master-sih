import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle, Plus, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RADAR_SKILLS } from '../../data/skills';
import { SkillBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';

const TECH_SKILLS = [
  { name: 'React', level: 80, verified: true, color: '#61DAFB' },
  { name: 'JavaScript', level: 78, verified: true, color: '#F7DF1E' },
  { name: 'Node.js', level: 72, verified: false, color: '#68A063' },
  { name: 'Python', level: 70, verified: true, color: '#3776AB' },
  { name: 'SQL', level: 65, verified: false, color: '#336791' },
  { name: 'Git', level: 75, verified: true, color: '#F05032' },
  { name: 'Tailwind CSS', level: 75, verified: false, color: '#38B2AC' },
  { name: 'AWS', level: 40, verified: false, color: '#FF9900' },
];

const SOFT_SKILLS = [
  { name: 'Communication', level: 82 },
  { name: 'Teamwork', level: 88 },
  { name: 'Problem Solving', level: 85 },
  { name: 'Time Management', level: 76 },
  { name: 'Leadership', level: 68 },
];

const CAREER_COMPAT = [
  { role: 'Full Stack Developer', pct: 92, color: '#3B82F6' },
  { role: 'Frontend Engineer', pct: 88, color: '#8B5CF6' },
  { role: 'Backend Engineer', pct: 74, color: '#10B981' },
  { role: 'Data Engineer', pct: 62, color: '#F59E0B' },
  { role: 'DevOps Engineer', pct: 48, color: '#06B6D4' },
];

const ALL_SKILLS = ['React', 'Vue.js', 'Angular', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'REST APIs', 'Machine Learning', 'Deep Learning', 'Next.js', 'Flutter'];

export default function SkillProfile() {
  const { currentUser } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [customSkills, setCustomSkills] = useState([]);

  const addSkill = (skill) => {
    if (skill && !customSkills.includes(skill)) {
      setCustomSkills(prev => [...prev, skill]);
    }
    setNewSkill('');
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter, sans-serif' }}>
            Skill Profile
          </h1>
          <p style={{ margin: 0, color: 'var(--text-3)' }}>Your verified skills and career compatibility</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary">
          <Plus size={16} /> Add Skill
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
        {/* Radar Chart */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-1)' }}>Skill Radar</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={RADAR_SKILLS} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-2)', fontSize: 12 }} />
              <Radar name="Skills" dataKey="A" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip
                contentStyle={{ background: 'var(--surface-el)', border: '1px solid var(--border)', borderRadius: 8 }}
                labelStyle={{ color: 'var(--text-1)' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Career Compatibility */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-1)' }}>Career Compatibility</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {CAREER_COMPAT.map(c => (
              <div key={c.role}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-1)' }}>{c.role}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: c.color }}>{c.pct}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'var(--border)' }}>
                  <div style={{ height: '100%', width: `${c.pct}%`, borderRadius: 3, background: c.color, transition: 'width 0.6s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Skills */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-1)' }}>Technical Skills</h3>
          <div style={{ display: 'flex', gap: 16, fontSize: '0.75rem', color: 'var(--text-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <CheckCircle size={12} color="#10B981" /> Verified
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[...TECH_SKILLS, ...customSkills.map((s, i) => ({ name: s, level: 50, verified: false, color: 'var(--text-3)' }))].map(s => (
            <div key={s.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-1)', fontWeight: 500 }}>{s.name}</span>
                  {s.verified && <CheckCircle size={12} color="#10B981" />}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{s.level}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'var(--border)' }}>
                <div style={{
                  height: '100%', width: `${s.level}%`, borderRadius: 3,
                  background: s.verified ? '#10B981' : '#3B82F6',
                  transition: 'width 0.6s ease',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <h3 style={{ margin: '0 0 1rem', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-1)' }}>Soft Skills</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {SOFT_SKILLS.map(s => (
            <div key={s.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-1)' }}>{s.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-2)' }}>{s.level}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'var(--border)' }}>
                <div style={{ height: '100%', width: `${s.level}%`, borderRadius: 3, background: '#8B5CF6' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Skill">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-2)', marginBottom: 6, fontWeight: 600 }}>
              Search or enter skill
            </label>
            <input
              className="input"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              placeholder="e.g. Docker, TensorFlow..."
            />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginBottom: 8 }}>Suggested skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ALL_SKILLS.filter(s => !customSkills.includes(s)).map(s => (
                <button
                  key={s}
                  onClick={() => addSkill(s)}
                  style={{
                    padding: '4px 12px', borderRadius: 6, border: '1px solid var(--border)',
                    background: 'var(--input-bg)', color: 'var(--text-2)', cursor: 'pointer', fontSize: '0.8rem',
                    transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#141D2A'; e.currentTarget.style.color = '#e2e8f0'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#0A0F18'; e.currentTarget.style.color = '#94a3b8'; }}
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => addSkill(newSkill)} className="btn-primary" disabled={!newSkill.trim()}>
              Add Skill
            </button>
            <button onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
