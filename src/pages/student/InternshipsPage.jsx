import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { INTERNSHIPS } from '../../data/internships';
import { InternshipCard } from '../../components/features/InternshipCard';
import { Tabs } from '../../components/ui/Tabs';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/ui/EmptyState';
import { Briefcase } from 'lucide-react';
import { useBreakpoint } from '../../hooks/useBreakpoint';

const WORK_MODES = ['All', 'Remote', 'Hybrid', 'Onsite'];

export default function InternshipsPage() {
  const { applications, savedInternships } = useApp();
  const { isMobile } = useBreakpoint();
  const [tab, setTab] = useState('recommended');
  const [search, setSearch] = useState('');
  const [workMode, setWorkMode] = useState('All');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const appliedIds = applications.filter(a => a.type === 'internship').map(a => a.id);

  const filtered = INTERNSHIPS.filter(i => {
    const matchSearch = !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.company.toLowerCase().includes(search.toLowerCase()) || i.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchMode = workMode === 'All' || i.workMode === workMode;
    return matchSearch && matchMode;
  });

  const getTabData = () => {
    if (tab === 'recommended') return filtered.sort((a, b) => b.matchScore - a.matchScore);
    if (tab === 'all') return filtered;
    if (tab === 'saved') return filtered.filter(i => savedInternships.includes(i.id));
    if (tab === 'applied') return filtered.filter(i => appliedIds.includes(i.id));
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
            padding: '0.4rem 0.75rem', borderRadius: '0.5rem', border: 'none',
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
          Internships
        </h1>
        <p style={{ margin: 0, color: 'var(--text-3)' }}>Find internships that match your skills and career goals</p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Tabs
          tabs={[
            { value: 'recommended', label: 'Recommended' },
            { value: 'all', label: 'All', count: INTERNSHIPS.length },
            { value: 'saved', label: 'Saved', count: savedInternships.length },
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
              placeholder="Search internships..."
              style={{ paddingLeft: 32 }}
            />
          </div>
          {/* Mobile: filter drawer button */}
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
          {data.map(i => <InternshipCard key={i.id} internship={i} />)}
        </div>
      ) : (
        <EmptyState
          icon={Briefcase}
          title="No internships found"
          description={tab === 'saved' ? 'Save internships to view them here' : tab === 'applied' ? 'Apply to internships to track them here' : 'Try adjusting your filters'}
        />
      )}
    </div>
  );
}
