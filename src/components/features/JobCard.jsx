import { useState } from 'react';
import { MapPin, Clock, Calendar, Bookmark, ExternalLink, CheckCircle, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getDaysLeft } from '../../utils/formatters';
import { MatchScore } from '../ui/MatchScore';
import { SkillTag } from '../ui/Badge';
import { Modal } from '../ui/Modal';

export function JobCard({ job }) {
  const { applyToOpportunity, hasApplied, toggleSaveJob, isJobSaved } = useApp();
  const [showModal, setShowModal] = useState(false);
  const applied = hasApplied(job.id, 'job');
  const saved = isJobSaved(job.id);
  const daysLeft = getDaysLeft(job.deadline);

  return (
    <>
      <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: `${job.companyColor}20`,
              border: `1px solid ${job.companyColor}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.875rem', fontWeight: 700, color: job.companyColor,
            }}>
              {job.company.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{job.title}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{job.company}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <MatchScore score={job.matchScore} />
            <button
              onClick={() => toggleSaveJob(job.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: saved ? '#3B82F6' : '#475569', padding: 4 }}
            >
              <Bookmark size={16} fill={saved ? '#3B82F6' : 'none'} />
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <Briefcase size={12} color="#10B981" />
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{job.salary}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <MapPin size={12} color="#64748b" />
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{job.location}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <Clock size={12} color="#64748b" />
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{job.experience}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <Calendar size={12} color={daysLeft.includes('day') && parseInt(daysLeft) <= 7 ? '#EF4444' : '#64748b'} />
            <span style={{
              fontSize: '0.75rem',
              color: daysLeft.includes('day') && parseInt(daysLeft) <= 7 ? '#EF4444' : '#94a3b8',
            }}>
              {daysLeft}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{
            padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 500,
            background: job.workMode === 'Remote' ? 'rgba(16,185,129,0.1)' : job.workMode === 'Hybrid' ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)',
            color: job.workMode === 'Remote' ? '#34d399' : job.workMode === 'Hybrid' ? '#60a5fa' : '#fbbf24',
            border: `1px solid ${job.workMode === 'Remote' ? 'rgba(16,185,129,0.2)' : job.workMode === 'Hybrid' ? 'rgba(59,130,246,0.2)' : 'rgba(245,158,11,0.2)'}`,
          }}>
            {job.workMode}
          </span>
          <span style={{
            padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 500,
            background: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)',
          }}>
            {job.type}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {job.skills.slice(0, 4).map(s => <SkillTag key={s} skill={s} />)}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <button onClick={() => setShowModal(true)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
            <ExternalLink size={14} /> View
          </button>
          <button
            onClick={() => !applied && applyToOpportunity(job, 'job')}
            className={applied ? 'btn-secondary' : 'btn-primary'}
            style={{ flex: 1, justifyContent: 'center', opacity: applied ? 0.7 : 1 }}
            disabled={applied}
          >
            {applied ? <><CheckCircle size={14} /> Applied</> : 'Apply Now'}
          </button>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={job.title}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0' }}>{job.title}</div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{job.company} • {job.location} • {job.salary}</div>
            </div>
            <MatchScore score={job.matchScore} size="md" />
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>{job.description}</p>
          <div>
            <h4 style={{ margin: '0 0 8px', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Responsibilities</h4>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {job.responsibilities.map((r, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: 4 }}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Eligibility</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#94a3b8' }}>{job.eligibility}</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Selection Process</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#94a3b8' }}>{job.selectionProcess}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => { applyToOpportunity(job, 'job'); setShowModal(false); }}
              className={applied ? 'btn-secondary' : 'btn-primary'}
              style={{ flex: 1, justifyContent: 'center' }}
              disabled={applied}
            >
              {applied ? 'Already Applied' : 'Apply Now'}
            </button>
            <button onClick={() => toggleSaveJob(job.id)} className="btn-secondary">
              <Bookmark size={14} fill={saved ? '#3B82F6' : 'none'} /> {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
