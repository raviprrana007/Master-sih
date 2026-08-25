import { useState } from 'react';
import { Search } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';

const STUDENTS = [
  { id: 1, name: 'Arjun Mehta', branch: 'CSE', year: '4th', cgpa: 9.4, skills: ['React', 'Python', 'ML'], status: 'Placed', company: 'Google', color: '#3B82F6' },
  { id: 2, name: 'Priya Singh', branch: 'ECE', year: '4th', cgpa: 9.2, skills: ['VLSI', 'Embedded C', 'Python'], status: 'Placed', company: 'Microsoft', color: '#8B5CF6' },
  { id: 3, name: 'Rohan Das', branch: 'CSE', year: '4th', cgpa: 9.0, skills: ['Java', 'Spring Boot', 'AWS'], status: 'Placed', company: 'Amazon', color: '#10B981' },
  { id: 4, name: 'Ananya Roy', branch: 'IT', year: '4th', cgpa: 8.9, skills: ['Flutter', 'Firebase', 'React'], status: 'Interning', company: 'Flipkart', color: '#F59E0B' },
  { id: 5, name: 'Vikram Nair', branch: 'CSE', year: '3rd', cgpa: 8.8, skills: ['Python', 'TensorFlow', 'Data Science'], status: 'Seeking', company: '', color: '#EF4444' },
  { id: 6, name: 'Sneha Pillai', branch: 'EEE', year: '3rd', cgpa: 8.6, skills: ['Power Systems', 'MATLAB', 'PLC'], status: 'Seeking', company: '', color: '#06B6D4' },
  { id: 7, name: 'Aditya Kumar', branch: 'CSE', year: '4th', cgpa: 8.5, skills: ['DevOps', 'Kubernetes', 'CI/CD'], status: 'Placed', company: 'Infosys', color: '#3B82F6' },
  { id: 8, name: 'Meera Iyer', branch: 'MCA', year: '2nd', cgpa: 8.4, skills: ['Python', 'Django', 'PostgreSQL'], status: 'Interning', company: 'Wipro', color: '#8B5CF6' },
  { id: 9, name: 'Rahul Sharma', branch: 'CSE', year: '3rd', cgpa: 8.2, skills: ['React', 'Node.js', 'MongoDB'], status: 'Seeking', company: '', color: '#10B981' },
  { id: 10, name: 'Kavya Reddy', branch: 'IT', year: '4th', cgpa: 8.1, skills: ['UI/UX', 'Figma', 'React'], status: 'Placed', company: 'Accenture', color: '#F59E0B' },
  { id: 11, name: 'Siddharth Rao', branch: 'ME', year: '4th', cgpa: 8.0, skills: ['AutoCAD', 'SolidWorks', 'FEA'], status: 'Seeking', company: '', color: '#EF4444' },
  { id: 12, name: 'Divya Menon', branch: 'CSE', year: '3rd', cgpa: 7.9, skills: ['Android', 'Kotlin', 'Firebase'], status: 'Interning', company: 'Cognizant', color: '#06B6D4' },
];

const STATUS_COLORS = {
  Placed: { bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.2)' },
  Interning: { bg: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: 'rgba(59,130,246,0.2)' },
  Seeking: { bg: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: 'rgba(245,158,11,0.2)' },
};

export default function StudentDirectory() {
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const branches = ['All', 'CSE', 'IT', 'ECE', 'EEE', 'ME', 'MCA'];
  const statuses = ['All', 'Placed', 'Interning', 'Seeking'];

  const filtered = STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.skills.some(sk => sk.toLowerCase().includes(search.toLowerCase()));
    const matchBranch = branchFilter === 'All' || s.branch === branchFilter;
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchBranch && matchStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>Student Directory</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Browse and manage all enrolled students</p>
        </div>
        <button className="btn-primary" style={{ background: '#3B82F6' }}>Export CSV</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or skill..."
            style={{ width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, background: '#101722', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0', fontSize: '0.875rem', boxSizing: 'border-box' }}
          />
        </div>
        <select
          value={branchFilter}
          onChange={e => setBranchFilter(e.target.value)}
          style={{ padding: '8px 12px', background: '#101722', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0', fontSize: '0.875rem' }}
        >
          {branches.map(b => <option key={b}>{b}</option>)}
        </select>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: '6px 14px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                background: statusFilter === s ? '#3B82F6' : 'transparent',
                color: statusFilter === s ? 'white' : '#94a3b8',
                border: `1px solid ${statusFilter === s ? '#3B82F6' : '#1e293b'}`,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
            <tr>
              {['Student', 'Branch', 'Year', 'CGPA', 'Skills', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ textAlign: 'left', fontSize: '0.75rem', color: '#64748b', padding: '12px 16px', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => {
              const sc = STATUS_COLORS[s.status];
              return (
                <tr key={s.id} style={{ borderTop: '1px solid #1e293b' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Avatar name={s.name} color={s.color} size="sm" />
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#e2e8f0' }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.8rem', color: '#94a3b8' }}>{s.branch}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.8rem', color: '#94a3b8' }}>{s.year}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.875rem', fontWeight: 600, color: s.cgpa >= 9 ? '#10B981' : '#e2e8f0' }}>{s.cgpa}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {s.skills.slice(0, 2).map(sk => (
                        <span key={sk} style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem', background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}>{sk}</span>
                      ))}
                      {s.skills.length > 2 && <span style={{ fontSize: '0.7rem', color: '#64748b' }}>+{s.skills.length - 2}</span>}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                      {s.status}{s.company ? ` @ ${s.company}` : ''}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>View</button>
                      <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '4px 10px', background: '#3B82F6' }}>Refer</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>No students found matching your filters.</div>
        )}
      </div>
    </div>
  );
}
