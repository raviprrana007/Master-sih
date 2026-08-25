import { useState } from 'react';
import { Search } from 'lucide-react';
import { JOBS } from '../../data/jobs';
import { JobCard } from '../../components/features/JobCard';
import { Tabs } from '../../components/ui/Tabs';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/ui/EmptyState';
import { Building2 } from 'lucide-react';

const WORK_MODES = ['All', 'Remote', 'Hybrid', 'Onsite'];

export default function JobsPage() {
  const { applications, savedJobs } = useApp();
  const [tab, setTab] = useState('recommended');
  const [search, setSearch] = useState('');
  const [workMode, setWorkMode] = useState('All');

  const appliedIds = applications.filter(a => a.type === 'job').map(a => a.id);

  const filtered = JOBS.filter(j => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()) || j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchMode = workMode === 'All' || j.workMode === workMode;
    return matchSearch && matchMode;
  });

  const getTabData = () => {
    if (tab === 'recommended') return filtered.sort((a, b) => b.matchScore - a.matchScore);
    if (tab === 'all') return filtered;
    if (tab === 'saved') return filtered.filter(j => savedJobs.includes(j.id));
    if (tab === 'applied') return filtered.filter(j => appliedIds.includes(j.id));
    return filtered;
  };

  const data = getTabData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
          Jobs
        </h1>
        <p style={{ margin: 0, color: '#64748b' }}>Full-time roles matching your skills and experience level</p>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Tabs
          tabs={[
            { value: 'recommended', label: 'Recommended' },
            { value: 'all', label: 'All', count: JOBS.length },
            { value: 'saved', label: 'Saved', count: savedJobs.length },
            { value: 'applied', label: 'Applied', count: appliedIds.length },
          ]}
          active={tab}
          onChange={setTab}
        />
        <div style={{ flex: 1, display: 'flex', gap: 8, minWidth: 0 }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              className="input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search jobs..."
              style={{ paddingLeft: 32 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {WORK_MODES.map(m => (
              <button
                key={m}
                onClick={() => setWorkMode(m)}
                style={{
                  padding: '0.4rem 0.75rem', borderRadius: '0.5rem',
                  cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500,
                  background: workMode === m ? '#3B82F6' : '#141D2A',
                  color: workMode === m ? 'white' : '#94a3b8',
                  border: `1px solid ${workMode === m ? '#3B82F6' : '#1e293b'}`,
                  fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {data.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {data.map(j => <JobCard key={j.id} job={j} />)}
        </div>
      ) : (
        <EmptyState
          icon={Building2}
          title="No jobs found"
          description={tab === 'saved' ? 'Save jobs to view them here' : tab === 'applied' ? 'Apply to jobs to track them here' : 'Try adjusting your filters'}
        />
      )}
    </div>
  );
}
