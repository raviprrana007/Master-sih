import { useState } from 'react';
import { JOBS } from '../../data/jobs';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const COMPANY_JOBS = JOBS.slice(0, 4).map((j, i) => ({
  ...j,
  company: 'TechNova Solutions',
  companyColor: '#06B6D4',
  status: i === 3 ? 'Paused' : 'Active',
  applicants: [34, 56, 89, 12][i],
}));

export default function ManageJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(COMPANY_JOBS);

  const toggleStatus = (id) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: j.status === 'Active' ? 'Paused' : 'Active' } : j));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>Manage Jobs</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Active job postings at TechNova Solutions</p>
        </div>
        <button onClick={() => navigate('/post')} className="btn-primary" style={{ background: '#06B6D4' }}>
          <PlusCircle size={16} /> Post New Job
        </button>
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b' }}>
              {['Job Title', 'Applicants', 'Posted', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobs.map(j => (
              <tr key={j.id} style={{ borderBottom: '1px solid #0A0F18' }}>
                <td style={{ padding: '0.875rem 1rem' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{j.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{j.salary} • {j.workMode}</div>
                </td>
                <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#94a3b8' }}>{j.applicants}</td>
                <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#64748b' }}>{j.postedDate}</td>
                <td style={{ padding: '0.875rem 1rem' }}>
                  <span style={{
                    padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 500,
                    background: j.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                    color: j.status === 'Active' ? '#34d399' : '#fbbf24',
                    border: `1px solid ${j.status === 'Active' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                  }}>
                    {j.status}
                  </span>
                </td>
                <td style={{ padding: '0.875rem 1rem' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.625rem' }}>View</button>
                    <button onClick={() => toggleStatus(j.id)} className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.25rem 0.625rem' }}>
                      {j.status === 'Active' ? 'Pause' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
