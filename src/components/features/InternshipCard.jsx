import { useState } from 'react';
import { MapPin, Clock, Calendar, DollarSign, Bookmark, ExternalLink, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatStipend, getDaysLeft } from '../../utils/formatters';
import { MatchScore } from '../ui/MatchScore';
import { SkillTag } from '../ui/Badge';
import { Modal } from '../ui/Modal';

export function InternshipCard({ internship }) {
  const { applyToOpportunity, hasApplied, toggleSaveInternship, isInternshipSaved } = useApp();
  const [showModal, setShowModal] = useState(false);
  const applied = hasApplied(internship.id, 'internship');
  const saved = isInternshipSaved(internship.id);
  const daysLeft = getDaysLeft(internship.deadline);

  return (
    <>
      <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: `${internship.companyColor}20`,
              border: `1px solid ${internship.companyColor}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.875rem', fontWeight: 700, color: internship.companyColor,
            }}>
              {internship.company.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{internship.title}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{internship.company}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <MatchScore score={internship.matchScore} />
            <button
              onClick={() => toggleSaveInternship(internship.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: saved ? '#3B82F6' : '#475569', padding: 4,
              }}
            >
              <Bookmark size={16} fill={saved ? '#3B82F6' : 'none'} />
            </button>
          </div>
        </div>

        {/* Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <DollarSign size={12} color="#10B981" />
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{formatStipend(internship.stipend)}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <MapPin size={12} color="#64748b" />
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{internship.location}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <Clock size={12} color="#64748b" />
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{internship.duration}</span>
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

        {/* Work mode badge */}
        <span style={{
          alignSelf: 'flex-start', padding: '2px 8px', borderRadius: 4,
          fontSize: '0.7rem', fontWeight: 500,
          background: internship.workMode === 'Remote' ? 'rgba(16,185,129,0.1)' :
            internship.workMode === 'Hybrid' ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)',
          color: internship.workMode === 'Remote' ? '#34d399' :
            internship.workMode === 'Hybrid' ? '#60a5fa' : '#fbbf24',
          border: `1px solid ${internship.workMode === 'Remote' ? 'rgba(16,185,129,0.2)' :
            internship.workMode === 'Hybrid' ? 'rgba(59,130,246,0.2)' : 'rgba(245,158,11,0.2)'}`,
        }}>
          {internship.workMode}
        </span>

        {/* Skills */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {internship.skills.slice(0, 4).map(s => <SkillTag key={s} skill={s} />)}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <button onClick={() => setShowModal(true)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
            <ExternalLink size={14} /> View
          </button>
          <button
            onClick={() => !applied && applyToOpportunity(internship, 'internship')}
            className={applied ? 'btn-secondary' : 'btn-primary'}
            style={{ flex: 1, justifyContent: 'center', opacity: applied ? 0.7 : 1 }}
            disabled={applied}
          >
            {applied ? <><CheckCircle size={14} /> Applied</> : 'Apply Now'}
          </button>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={internship.title}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0' }}>{internship.title}</div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{internship.company} • {internship.location}</div>
            </div>
            <MatchScore score={internship.matchScore} size="md" />
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>{internship.description}</p>
          <div>
            <h4 style={{ margin: '0 0 8px', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Responsibilities</h4>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {internship.responsibilities.map((r, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: 4 }}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Eligibility</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#94a3b8' }}>{internship.eligibility}</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Selection Process</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#94a3b8' }}>{internship.selectionProcess}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => { applyToOpportunity(internship, 'internship'); setShowModal(false); }}
              className={applied ? 'btn-secondary' : 'btn-primary'}
              style={{ flex: 1, justifyContent: 'center' }}
              disabled={applied}
            >
              {applied ? 'Already Applied' : 'Apply Now'}
            </button>
            <button onClick={() => toggleSaveInternship(internship.id)} className="btn-secondary">
              <Bookmark size={14} fill={saved ? '#3B82F6' : 'none'} /> {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
