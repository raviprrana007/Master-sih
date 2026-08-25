import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, BookOpen, ChevronRight } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/skills';
import { useNavigate } from 'react-router-dom';

export default function SkillGapAnalysis() {
  const [selectedCat, setSelectedCat] = useState(SKILL_CATEGORIES[0]);
  const navigate = useNavigate();

  const chartData = selectedCat.skills.map(s => ({
    name: s.name,
    yours: s.yourLevel,
    demand: s.demand,
    gap: s.gap,
  }));

  const totalGaps = SKILL_CATEGORIES.flatMap(c => c.skills).filter(s => s.gap > 20);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
          Skill Gap Analysis
        </h1>
        <p style={{ margin: 0, color: '#64748b' }}>Compare your skills against industry demand</p>
      </div>

      {/* Top priority gaps */}
      <div className="card" style={{ padding: '1.25rem', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.875rem' }}>
          <AlertTriangle size={16} color="#F59E0B" />
          <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>Priority Action Items</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
          {totalGaps.slice(0, 6).map(s => (
            <div key={s.name} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.5rem 0.75rem', background: '#0A0F18',
              borderRadius: '0.5rem', border: '1px solid rgba(245,158,11,0.15)',
            }}>
              <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>{s.name}</span>
              <span style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: 600 }}>-{s.gap}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category selector */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {SKILL_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat)}
            style={{
              padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none',
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.15s',
              background: selectedCat.id === cat.id ? '#3B82F6' : '#141D2A',
              color: selectedCat.id === cat.id ? 'white' : '#94a3b8',
              border: `1px solid ${selectedCat.id === cat.id ? '#3B82F6' : '#1e293b'}`,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Bar chart */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>
            {selectedCat.label} — Skill vs Demand
          </h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#94a3b8' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: '#3B82F6' }} /> Your Level
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#94a3b8' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(239,68,68,0.4)' }} /> Industry Demand
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} barGap={4}>
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#141D2A', border: '1px solid #1e293b', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Bar dataKey="demand" fill="rgba(239,68,68,0.25)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="yours" fill="#3B82F6" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Skill breakdown */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <h3 style={{ margin: '0 0 1rem', fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>
          Detailed Breakdown
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {selectedCat.skills.map(s => (
            <div key={s.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 500 }}>{s.name}</span>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Your level: {s.yourLevel}%</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Demand: {s.demand}%</span>
                  {s.gap > 0 && (
                    <span style={{
                      fontSize: '0.7rem', color: s.gap > 30 ? '#EF4444' : '#F59E0B',
                      background: s.gap > 30 ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                      padding: '1px 6px', borderRadius: 4, fontWeight: 600,
                    }}>
                      {s.gap}% gap
                    </span>
                  )}
                  {s.gap === 0 && <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 600 }}>✓ Met</span>}
                </div>
              </div>
              <div style={{ position: 'relative', height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.04)' }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, height: '100%',
                  width: `${s.demand}%`, borderRadius: 4, background: 'rgba(239,68,68,0.2)',
                }} />
                <div style={{
                  position: 'absolute', left: 0, top: 0, height: '100%',
                  width: `${s.yourLevel}%`, borderRadius: 4,
                  background: s.yourLevel >= s.demand ? '#10B981' : '#3B82F6',
                  transition: 'width 0.6s ease',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="card" style={{ padding: '1.25rem', border: '1px solid rgba(59,130,246,0.2)', background: 'rgba(59,130,246,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <TrendingUp size={16} color="#3B82F6" />
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>Close the gap with targeted learning</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
              We've curated {12} courses to specifically address your priority skill gaps.
            </p>
          </div>
          <button onClick={() => navigate('/learning')} className="btn-primary">
            <BookOpen size={14} /> Go to Learning <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
