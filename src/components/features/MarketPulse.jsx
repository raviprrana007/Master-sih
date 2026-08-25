import { useState, useEffect } from 'react';
import { Zap, RefreshCw } from 'lucide-react';
import { MARKET_NEWS } from '../../data/marketNews';

const CATEGORY_COLORS = {
  Hiring: '#10B981', Layoffs: '#EF4444', AI: '#8B5CF6',
  Cloud: '#3B82F6', Campus: '#F59E0B', Product: '#06B6D4',
  Industry: '#F97316', Skills: '#EC4899',
};

export function MarketPulse() {
  const [batchIndex, setBatchIndex] = useState(0);
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const handleManualRefresh = () => {
    setBatchIndex(prev => prev + 1);
    setSecondsAgo(0);
    setAnimKey(prev => prev + 1);
    setSpinning(true);
    setTimeout(() => setSpinning(false), 600);
  };

  const BATCH_SIZE = 4;
  const totalBatches = Math.ceil(MARKET_NEWS.length / BATCH_SIZE);
  const currentBatch = MARKET_NEWS.slice(
    (batchIndex % totalBatches) * BATCH_SIZE,
    (batchIndex % totalBatches) * BATCH_SIZE + BATCH_SIZE
  );

  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setBatchIndex(prev => prev + 1);
      setSecondsAgo(0);
      setAnimKey(prev => prev + 1);
    }, 30000);

    const tickInterval = setInterval(() => {
      setSecondsAgo(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(rotateInterval);
      clearInterval(tickInterval);
    };
  }, []);

  return (
    <div className="card" style={{ padding: '1rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap size={14} color="#F59E0B" />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '0.05em' }}>
            MARKET PULSE
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%', background: '#10B981',
              boxShadow: '0 0 6px #10B981',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 600 }}>LIVE</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>
            {secondsAgo}s ago
          </span>
          <button
            onClick={handleManualRefresh}
            title="Refresh news"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-3)', padding: 2, display: 'flex', alignItems: 'center',
              borderRadius: 4, transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
          >
            <RefreshCw
              size={11}
              style={{ transition: 'transform 0.6s', transform: spinning ? 'rotate(360deg)' : 'none' }}
            />
          </button>
        </div>
      </div>

      <div key={animKey} className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {currentBatch.map((item, i) => (
          <div
            key={item.id}
            style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.companyColor, flexShrink: 0 }} />
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: item.companyColor, letterSpacing: '0.05em' }}>
                  {item.company}
                </span>
              </div>
              <span
                className="badge"
                style={{
                  fontSize: '0.6rem', padding: '1px 6px',
                  background: `${CATEGORY_COLORS[item.category] || '#3B82F6'}15`,
                  color: CATEGORY_COLORS[item.category] || '#3B82F6',
                  border: `1px solid ${CATEGORY_COLORS[item.category] || '#3B82F6'}30`,
                }}
              >
                {item.category}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-1)', fontWeight: 500, lineHeight: 1.4 }}>
              {item.title}
            </p>
            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-2)', lineHeight: 1.3 }}>
              {item.detail}
            </p>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>{item.time}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: '0.75rem' }}>
        {Array.from({ length: totalBatches }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setBatchIndex(i); setSecondsAgo(0); setAnimKey(prev => prev + 1); }}
            style={{
              width: i === (batchIndex % totalBatches) ? 16 : 6,
              height: 6, borderRadius: 3, border: 'none', cursor: 'pointer',
              background: i === (batchIndex % totalBatches) ? '#3B82F6' : 'var(--border)',
              transition: 'all 0.2s', padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
