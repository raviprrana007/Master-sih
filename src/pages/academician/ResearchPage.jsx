export default function ResearchPage() {
  const projects = [
    { title: 'Federated Learning for Healthcare Privacy', pi: 'Dr. Priya Sharma', status: 'Active', funding: 'DST — ₹25L', team: 3, publications: 2 },
    { title: 'Explainable AI for Financial Risk', pi: 'Dr. Priya Sharma', status: 'Active', funding: 'SERB — ₹18L', team: 4, publications: 1 },
    { title: 'NLP for Indic Language Processing', pi: 'Collaboration', status: 'Proposed', funding: 'MEITY — Pending', team: 6, publications: 0 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>Research Projects</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Ongoing and proposed research collaborations</p>
        </div>
        <button className="btn-primary" style={{ background: '#10B981' }}>+ New Proposal</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {projects.map(p => (
          <div key={p.title} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>{p.title}</h3>
                  <span style={{
                    padding: '1px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 600,
                    background: p.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                    color: p.status === 'Active' ? '#34d399' : '#fbbf24',
                    border: `1px solid ${p.status === 'Active' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                  }}>
                    {p.status}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: '0.8rem', color: '#64748b' }}>
                  <span>👥 Team: {p.team}</span>
                  <span>📄 Publications: {p.publications}</span>
                  <span>💰 {p.funding}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn-secondary" style={{ fontSize: '0.8rem' }}>View</button>
                <button className="btn-primary" style={{ fontSize: '0.8rem', background: '#10B981' }}>Collaborate</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
