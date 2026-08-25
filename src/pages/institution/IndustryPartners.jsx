import { useState } from 'react';
import { Building2, Users, Briefcase, Star } from 'lucide-react';

const PARTNERS = [
  { id: 1, name: 'Google', sector: 'Technology', tier: 'Platinum', hired: 8, active: 3, since: '2018', contact: 'talent@google.com', color: '#4285F4', rating: 4.9 },
  { id: 2, name: 'Microsoft', sector: 'Technology', tier: 'Platinum', hired: 12, active: 4, since: '2017', contact: 'campus@microsoft.com', color: '#00A4EF', rating: 4.8 },
  { id: 3, name: 'Amazon', sector: 'E-commerce/Cloud', tier: 'Gold', hired: 15, active: 5, since: '2019', contact: 'university@amazon.com', color: '#FF9900', rating: 4.7 },
  { id: 4, name: 'Infosys', sector: 'IT Services', tier: 'Gold', hired: 32, active: 8, since: '2010', contact: 'campus@infosys.com', color: '#007CC3', rating: 4.5 },
  { id: 5, name: 'TCS', sector: 'IT Services', tier: 'Gold', hired: 45, active: 10, since: '2008', contact: 'campus.tcs@tcs.com', color: '#5B2D8E', rating: 4.4 },
  { id: 6, name: 'Wipro', sector: 'IT Services', tier: 'Silver', hired: 28, active: 6, since: '2012', contact: 'campus@wipro.com', color: '#341C61', rating: 4.3 },
  { id: 7, name: 'Accenture', sector: 'Consulting', tier: 'Silver', hired: 22, active: 5, since: '2015', contact: 'recruit@accenture.com', color: '#A100FF', rating: 4.4 },
  { id: 8, name: 'Cognizant', sector: 'IT Services', tier: 'Silver', hired: 18, active: 4, since: '2014', contact: 'campus@cognizant.com', color: '#1F77C6', rating: 4.2 },
  { id: 9, name: 'HDFC Bank', sector: 'Banking & Finance', tier: 'Gold', hired: 10, active: 3, since: '2016', contact: 'hr@hdfcbank.com', color: '#0072AA', rating: 4.5 },
  { id: 10, name: 'Flipkart', sector: 'E-commerce', tier: 'Silver', hired: 14, active: 3, since: '2018', contact: 'campus@flipkart.com', color: '#F7731C', rating: 4.3 },
  { id: 11, name: 'Zomato', sector: 'Food Tech', tier: 'Bronze', hired: 6, active: 2, since: '2021', contact: 'hr@zomato.com', color: '#E23744', rating: 4.0 },
  { id: 12, name: 'Razorpay', sector: 'Fintech', tier: 'Bronze', hired: 4, active: 1, since: '2022', contact: 'campus@razorpay.com', color: '#2C8AF8', rating: 4.1 },
];

const TIER_COLORS = {
  Platinum: { bg: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: 'rgba(139,92,246,0.3)' },
  Gold: { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  Silver: { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8', border: 'rgba(148,163,184,0.3)' },
  Bronze: { bg: 'rgba(180,120,60,0.15)', color: '#b87333', border: 'rgba(180,120,60,0.3)' },
};

export default function IndustryPartners() {
  const [tierFilter, setTierFilter] = useState('All');
  const [sectorFilter, setSectorFilter] = useState('All');

  const tiers = ['All', 'Platinum', 'Gold', 'Silver', 'Bronze'];
  const sectors = ['All', 'Technology', 'IT Services', 'Consulting', 'Banking & Finance', 'E-commerce', 'Fintech', 'Food Tech'];

  const filtered = PARTNERS.filter(p => {
    const matchTier = tierFilter === 'All' || p.tier === tierFilter;
    const matchSector = sectorFilter === 'All' || p.sector.includes(sectorFilter.replace('E-commerce', 'E-commerce').replace('Banking & Finance', 'Banking'));
    return matchTier && matchSector;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>Industry Partners</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Manage corporate relationships and hiring pipelines</p>
        </div>
        <button className="btn-primary" style={{ background: '#3B82F6' }}>+ Add Partner</button>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {[
          { label: 'Total Partners', value: PARTNERS.length, icon: Building2, color: '#3B82F6' },
          { label: 'Total Hired', value: PARTNERS.reduce((a, p) => a + p.hired, 0), icon: Users, color: '#10B981' },
          { label: 'Active Openings', value: PARTNERS.reduce((a, p) => a + p.active, 0), icon: Briefcase, color: '#F59E0B' },
          { label: 'Avg Rating', value: (PARTNERS.reduce((a, p) => a + p.rating, 0) / PARTNERS.length).toFixed(1), icon: Star, color: '#8B5CF6' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: s.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <s.icon size={18} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tiers.map(t => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              style={{
                padding: '6px 14px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                background: tierFilter === t ? '#3B82F6' : 'transparent',
                color: tierFilter === t ? 'white' : '#94a3b8',
                border: `1px solid ${tierFilter === t ? '#3B82F6' : '#1e293b'}`,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Partner grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
        {filtered.map(p => {
          const tc = TIER_COLORS[p.tier];
          return (
            <div key={p.id} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: p.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 700, color: p.color }}>
                    {p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>{p.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.sector}</div>
                  </div>
                </div>
                <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 600, background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>{p.tier}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
                {[
                  { label: 'Hired', value: p.hired },
                  { label: 'Active', value: p.active },
                  { label: 'Since', value: p.since },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center', padding: '6px 0', background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0' }}>{s.value}</div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 12 }}>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F59E0B' }}>{p.rating}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>· {p.contact}</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem', justifyContent: 'center' }}>View Portal</button>
                <button className="btn-primary" style={{ flex: 1, fontSize: '0.8rem', background: '#3B82F6', justifyContent: 'center' }}>Contact</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
