import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function PostOpportunity() {
  const [type, setType] = useState('job');
  const [form, setForm] = useState({ title: '', skills: '', salary: '', location: '', workMode: 'Hybrid', deadline: '', description: '' });
  const [posted, setPosted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosted(true);
    setTimeout(() => setPosted(false), 3000);
  };

  if (posted) {
    return (
      <div style={{ maxWidth: 500, margin: '4rem auto', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <CheckCircle size={36} color="#10B981" />
        </div>
        <h2 style={{ margin: '0 0 8px', color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>Opportunity Posted!</h2>
        <p style={{ color: '#64748b' }}>Your {type} listing is now live and visible to matching candidates.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>Post Opportunity</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Reach thousands of qualified candidates</p>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {['job', 'internship'].map(t => (
          <button key={t} onClick={() => setType(t)} style={{
            padding: '0.5rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem',
            background: type === t ? '#06B6D4' : '#141D2A', color: type === t ? 'white' : '#94a3b8',
            border: `1px solid ${type === t ? '#06B6D4' : '#1e293b'}`, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s',
          }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { label: 'Job Title', key: 'title', placeholder: `e.g. Senior ${type === 'job' ? 'Full Stack Engineer' : 'Data Science Intern'}` },
          { label: 'Required Skills (comma separated)', key: 'skills', placeholder: 'React, Node.js, PostgreSQL' },
          { label: type === 'job' ? 'Salary Range' : 'Monthly Stipend', key: 'salary', placeholder: type === 'job' ? '₹15-25 LPA' : '₹50,000/month' },
          { label: 'Location', key: 'location', placeholder: 'Bangalore, India' },
          { label: 'Application Deadline', key: 'deadline', type: 'date' },
        ].map(f => (
          <div key={f.key}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>{f.label}</label>
            <input
              className="input"
              type={f.type || 'text'}
              value={form[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              required
            />
          </div>
        ))}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Work Mode</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Remote', 'Hybrid', 'Onsite'].map(m => (
              <button key={m} type="button" onClick={() => setForm(p => ({ ...p, workMode: m }))} style={{
                padding: '0.4rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.8rem',
                background: form.workMode === m ? '#06B6D4' : 'transparent', color: form.workMode === m ? 'white' : '#94a3b8',
                border: `1px solid ${form.workMode === m ? '#06B6D4' : '#1e293b'}`, fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>{m}</button>
            ))}
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Job Description</label>
          <textarea
            className="input"
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Describe the role, responsibilities, and what you're looking for..."
            rows={5}
            style={{ resize: 'vertical' }}
            required
          />
        </div>
        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.75rem', background: '#06B6D4' }}>
          Post Opportunity
        </button>
      </form>
    </div>
  );
}
