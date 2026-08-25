import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/ui/EmptyState';
import { FileText, CheckCircle, Clock, Eye, XCircle } from 'lucide-react';

const STATUS_STYLES = {
  Applied: { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)', icon: Clock },
  Viewed: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', icon: Eye },
  Shortlisted: { color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', icon: CheckCircle },
  Rejected: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)', icon: XCircle },
};

export default function ApplicationsPage() {
  const { applications } = useApp();

  if (applications.length === 0) {
    return (
      <div>
        <h1 style={{ margin: '0 0 1.5rem', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
          My Applications
        </h1>
        <EmptyState
          icon={FileText}
          title="No applications yet"
          description="Start applying to internships and jobs to track them here"
        />
      </div>
    );
  }

  const internshipApps = applications.filter(a => a.type === 'internship');
  const jobApps = applications.filter(a => a.type === 'job');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
          My Applications
        </h1>
        <p style={{ margin: 0, color: '#64748b' }}>{applications.length} total applications</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {['Applied', 'Viewed', 'Shortlisted', 'Rejected'].map(status => {
          const s = STATUS_STYLES[status];
          const count = applications.filter(a => a.status === status).length + (status === 'Applied' ? applications.length - applications.filter(a => a.status !== 'Applied').length : 0);
          const Icon = s.icon;
          return (
            <div key={status} className="card" style={{ padding: '1rem', textAlign: 'center', border: `1px solid ${s.border}` }}>
              <Icon size={20} color={s.color} style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: s.color }}>{applications.length}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{status}</div>
            </div>
          );
        })}
      </div>

      {internshipApps.length > 0 && (
        <div>
          <h2 style={{ margin: '0 0 0.875rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Internship Applications</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {internshipApps.map(app => (
              <ApplicationRow key={app.id} app={app} />
            ))}
          </div>
        </div>
      )}

      {jobApps.length > 0 && (
        <div>
          <h2 style={{ margin: '0 0 0.875rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>Job Applications</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {jobApps.map(app => (
              <ApplicationRow key={app.id} app={app} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ApplicationRow({ app }) {
  const s = STATUS_STYLES[app.status] || STATUS_STYLES['Applied'];
  const Icon = s.icon;
  return (
    <div className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
        background: `${app.companyColor || '#3B82F6'}20`,
        border: `1px solid ${app.companyColor || '#3B82F6'}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.875rem', fontWeight: 700, color: app.companyColor || '#3B82F6',
      }}>
        {(app.company || '?').charAt(0)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{app.title}</div>
        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
          {app.company} • Applied on {app.appliedDate}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 500,
          background: s.bg, color: s.color, border: `1px solid ${s.border}`,
        }}>
          <Icon size={11} /> {app.status}
        </span>
        {app.matchScore && (
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10B981' }}>{app.matchScore}% match</span>
        )}
      </div>
    </div>
  );
}
