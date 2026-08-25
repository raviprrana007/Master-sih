import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ContributionGraph } from '../../components/features/ContributionGraph';
import { Share2, Download, CheckCircle, ExternalLink, MapPin, Globe } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';

const PROJECTS = [
  { name: 'HackIndia 2026 Winner App', desc: 'AI-powered crop disease detection using YOLOv8 and React Native', tech: ['React Native', 'FastAPI', 'YOLOv8', 'AWS'], link: '#', stars: 142 },
  { name: 'SentimentLens NLP', desc: 'Real-time multilingual sentiment analyzer for 12 Indian languages', tech: ['PyTorch', 'HuggingFace', 'FastAPI', 'React'], link: '#', stars: 89 },
  { name: 'Campus EV Tracker', desc: 'IoT-based electric vehicle charging station tracking app', tech: ['React', 'Node.js', 'IoT', 'Maps API'], link: '#', stars: 34 },
];

const CERTIFICATIONS = [
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: 'Aug 2026', color: '#FF9900' },
  { name: 'React Developer Certificate', issuer: 'Meta via Coursera', date: 'May 2026', color: '#0866FF' },
  { name: 'Machine Learning Specialization', issuer: 'Stanford via Coursera', date: 'Mar 2026', color: '#0056D2' },
];

const ACHIEVEMENTS = [
  { title: '🏆 1st Place — HackIndia 2026', desc: 'Won ₹2L prize for AI-powered AgriTech solution', date: 'Aug 2026' },
  { title: '🎖 KIIT Academic Excellence Award', desc: 'Top 5% student in CS department', date: 'Apr 2026' },
  { title: '⭐ Google Summer of Code Participant', desc: 'Contributed to OpenMRS open-source healthcare platform', date: 'Jun 2026' },
];

export default function DigitalPortfolio() {
  const { currentUser } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const readiness = currentUser?.careerReadiness || 78;
  const circumference = 2 * Math.PI * 40;
  const dash = (readiness / 100) * circumference;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <button onClick={handleShare} className="btn-secondary">
          <Share2 size={14} /> {copied ? 'Link Copied!' : 'Share Portfolio'}
        </button>
        <button className="btn-primary">
          <Download size={14} /> Download Resume
        </button>
      </div>

      {/* Profile header */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <Avatar name={currentUser?.name} color={currentUser?.color} size="2xl" />
          <div style={{ flex: 1, minWidth: 200 }}>
            <h1 style={{ margin: '0 0 4px', fontSize: '1.75rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
              {currentUser?.name}
            </h1>
            <div style={{ fontSize: '1rem', color: '#3B82F6', marginBottom: 8 }}>{currentUser?.title}</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
              <span style={{ fontSize: '0.875rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={12} /> {currentUser?.location}
              </span>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                {currentUser?.institution} • {currentUser?.year}
              </span>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                CGPA: {currentUser?.cgpa}
              </span>
            </div>
            <p style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>
              {currentUser?.about}
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(currentUser?.skills || []).map(s => (
                <span key={s} style={{
                  padding: '3px 10px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 500,
                  background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)',
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          {/* Career Readiness Ring */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <svg width="100" height="100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="40" fill="none" stroke={currentUser?.color || '#3B82F6'} strokeWidth="6"
                strokeDasharray={`${dash} ${circumference}`}
                strokeLinecap="round"
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
              />
              <text x="50" y="50" textAnchor="middle" dy="0.3em" fill="#e2e8f0" fontSize="16" fontWeight="700">
                {readiness}%
              </text>
            </svg>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>Career Readiness</span>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 style={{ margin: '0 0 0.875rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {PROJECTS.map(p => (
            <div key={p.name} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{p.name}</h3>
                <button onClick={() => {}} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                  <ExternalLink size={14} />
                </button>
              </div>
              <p style={{ margin: '0 0 10px', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                {p.tech.map(t => <span key={t} style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem', background: '#0A0F18', color: '#64748b', border: '1px solid #1e293b' }}>{t}</span>)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>⭐ {p.stars} stars</div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h2 style={{ margin: '0 0 0.875rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Certifications</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CERTIFICATIONS.map(c => (
            <div key={c.name} className="card" style={{ padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
              <CheckCircle size={18} color={c.color} style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{c.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.issuer}</div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 style={{ margin: '0 0 0.875rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Achievements</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ACHIEVEMENTS.map(a => (
            <div key={a.title} className="card" style={{ padding: '0.875rem 1rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>{a.title}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 2 }}>{a.desc}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{a.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contribution Graph */}
      <ContributionGraph userId={currentUser?.id} />
    </div>
  );
}
