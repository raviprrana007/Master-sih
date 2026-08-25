import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { INTERNSHIPS } from '../../data/internships';
import { InternshipCard } from '../../components/features/InternshipCard';
import { Tabs } from '../../components/ui/Tabs';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/ui/EmptyState';
import { Briefcase } from 'lucide-react';

const WORK_MODES = ['All', 'Remote', 'Hybrid', 'Onsite'];

export default function InternshipsPage() {
  const { applications, savedInternships } = useApp();
  const [tab, setTab] = useState('recommended');
  const [search, setSearch] = useState('');
  const [workMode, setWorkMode] = useState('All');

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
          Internships
        </h1>
        <p style={{ margin: 0, color: '#64748b' }}>Find internships that match your skills and career goals</p>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
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
        <div style={{ flex: 1, display: 'flex', gap: 8, minWidth: 0 }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              className="input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search internships..."
              style={{ paddingLeft: 32 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {WORK_MODES.map(m => (
              <button
                key={m}
                onClick={() => setWorkMode(m)}
                style={{
                  padding: '0.4rem 0.75rem', borderRadius: '0.5rem', border: 'none',
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
