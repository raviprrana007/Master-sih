import { useApp } from '../../context/AppContext';
import { INTERNSHIPS } from '../../data/internships';
import { JOBS } from '../../data/jobs';
import { InternshipCard } from '../../components/features/InternshipCard';
import { JobCard } from '../../components/features/JobCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { Bookmark } from 'lucide-react';

export default function SavedPage() {
  const { savedInternships, savedJobs } = useApp();
  const savedIntData = INTERNSHIPS.filter(i => savedInternships.includes(i.id));
  const savedJobData = JOBS.filter(j => savedJobs.includes(j.id));
  const total = savedIntData.length + savedJobData.length;

  if (total === 0) {
    return (
      <div>
        <h1 style={{ margin: '0 0 1.5rem', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
          Saved
        </h1>
        <EmptyState
          icon={Bookmark}
          title="Nothing saved yet"
          description="Save internships and jobs to revisit them later"
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>
          Saved
        </h1>
        <p style={{ margin: 0, color: '#64748b' }}>{total} saved opportunities</p>
      </div>

      {savedIntData.length > 0 && (
        <div>
          <h2 style={{ margin: '0 0 0.875rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>
            Internships ({savedIntData.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {savedIntData.map(i => <InternshipCard key={i.id} internship={i} />)}
          </div>
        </div>
      )}

      {savedJobData.length > 0 && (
        <div>
          <h2 style={{ margin: '0 0 0.875rem', fontSize: '1rem', fontWeight: 600, color: '#e2e8f0' }}>
            Jobs ({savedJobData.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {savedJobData.map(j => <JobCard key={j.id} job={j} />)}
          </div>
        </div>
      )}
    </div>
  );
}
