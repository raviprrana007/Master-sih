import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { JOBS } from '../../data/jobs';
import { JobCard } from '../../components/features/JobCard';
import { Tabs } from '../../components/ui/Tabs';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/ui/EmptyState';
import { Building2 } from 'lucide-react';
import { useBreakpoint } from '../../hooks/useBreakpoint';

const WORK_MODES = ['All', 'Remote', 'Hybrid', 'Onsite'];

export default function JobsPage() {
  const { applications, savedJobs } = useApp();
  const { isMobile } = useBreakpoint();
  const [tab, setTab] = useState('recommended');
  const [search, setSearch] = useState('');
  const [workMode, setWorkMode] = useState('All');
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  const WorkModeFilters = () => (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {WORK_MODES.map(m => (
        <button
          key={m}
          onClick={() => { setWorkMode(m); if (isMobile) setFiltersOpen(false); }}
          style={{
            padding: '0.4rem 0.75rem', borderRadius: '0.5rem',
            cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500,
            background: workMode === m ? 'var(--accent)' : 'var(--surface-el)',
            color: workMode === m ? 'white' : 'var(--text-2)',
            border: `1px solid ${workMode === m ? 'var(--accent)' : 'var(--border)'}`,
            fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
          }}
        >
          {m}
        </button>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vw, 24px)' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter, sans-serif' }}>
          Jobs
        </h1>
        <p style={{ margin: 0, color: 'var(--text-3)' }}>Full-time roles matching your skills and experience level</p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
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
        <div style={{ flex: 1, display: 'flex', gap: 8, minWidth: 0, alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
            <input
              className="input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search jobs..."
              style={{ paddingLeft: 32 }}
            />
          </div>
          {isMobile ? (
            <button
              onClick={() => setFiltersOpen(true)}
              className="btn-secondary"
              style={{ flexShrink: 0 }}
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
          ) : (
            <WorkModeFilters />
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {isMobile && filtersOpen && (
        <>
          <div
            onClick={() => setFiltersOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 199 }}
          />
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
            background: 'var(--surface)', borderRadius: '16px 16px 0 0',
            padding: '20px', maxHeight: '70dvh', overflowY: 'auto',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.15)',
            paddingBottom: 'calc(20px + env(safe-area-inset-bottom))',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>Work Mode</span>
              <button onClick={() => setFiltersOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-2)', padding: 4 }}>
                <X size={18} />
              </button>
            </div>
            <WorkModeFilters />
          </div>
        </>
      )}

      {data.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(10px, 1.5vw, 16px)',
        }}>
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
