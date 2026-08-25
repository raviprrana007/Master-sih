import { useState } from 'react';
import { INTERNSHIPS } from '../../data/internships';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const COMPANY_INTS = INTERNSHIPS.slice(0, 3).map((i, idx) => ({
  ...i,
  company: 'TechNova Solutions',
  companyColor: '#06B6D4',
  status: idx === 2 ? 'Closed' : 'Active',
  applicants: [28, 45, 89][idx],
}));

export default function ManageInternships() {
  const navigate = useNavigate();
  const [ints, setInts] = useState(COMPANY_INTS);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>Manage Internships</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Current internship programs at TechNova Solutions</p>
        </div>
        <button onClick={() => navigate('/post')} className="btn-primary" style={{ background: '#06B6D4' }}>
          <PlusCircle size={16} /> Post Internship
        </button>
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b' }}>
              {['Internship', 'Applicants', 'Duration', 'Stipend', 'Status'].map(h => (
                <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ints.map(i => (
              <tr key={i.id} style={{ borderBottom: '1px solid #0A0F18' }}>
                <td style={{ padding: '0.875rem 1rem' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{i.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{i.workMode} • {i.location}</div>
                </td>
                <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#94a3b8' }}>{i.applicants}</td>
                <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#94a3b8' }}>{i.duration}</td>
                <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#10B981', fontWeight: 600 }}>₹{i.stipend.toLocaleString('en-IN')}</td>
                <td style={{ padding: '0.875rem 1rem' }}>
                  <span style={{
                    padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 500,
                    background: i.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(100,116,139,0.1)',
                    color: i.status === 'Active' ? '#34d399' : '#94a3b8',
                    border: `1px solid ${i.status === 'Active' ? 'rgba(16,185,129,0.2)' : '#1e293b'}`,
                  }}>
                    {i.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
