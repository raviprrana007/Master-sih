export default function ConsultancyPage() {
  const projects = [
    { title: 'AI Model Optimization for BFSI', company: 'HDFC Bank', budget: '₹8-12L', duration: '3 months', skills: ['ML', 'Python', 'Finance AI'] },
    { title: 'Smart Grid Analytics', company: 'NTPC Limited', budget: '₹5-8L', duration: '4 months', skills: ['IoT', 'Data Analytics', 'MATLAB'] },
    { title: 'NLP for Legal Document Processing', company: 'LegalTech India', budget: '₹4-6L', duration: '2 months', skills: ['NLP', 'Python', 'LLMs'] },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>Consultancy Projects</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Industry consulting opportunities aligned with your expertise</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {projects.map(p => (
          <div key={p.title} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px', fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>{p.title}</h3>
                <div style={{ fontSize: '0.875rem', color: '#10B981', fontWeight: 600, marginBottom: 8 }}>{p.company}</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {p.skills.map(s => <span key={s} style={{ padding: '1px 8px', borderRadius: 4, fontSize: '0.75rem', background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>{s}</span>)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10B981' }}>{p.budget}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.duration}</div>
                <button className="btn-primary" style={{ marginTop: 8, background: '#10B981', fontSize: '0.8rem' }}>Express Interest</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
