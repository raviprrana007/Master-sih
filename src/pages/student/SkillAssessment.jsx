import { useState } from 'react';
import { Brain, Clock, ChevronRight, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { ASSESSMENT_QUESTIONS } from '../../data/skills';
import { useApp } from '../../context/AppContext';

const CATEGORIES = [
  { id: 'programming', label: 'Programming Fundamentals', icon: '💻', color: '#3B82F6' },
  { id: 'frontend', label: 'Frontend Development', icon: '🎨', color: '#8B5CF6' },
  { id: 'backend', label: 'Backend & APIs', icon: '⚙️', color: '#10B981' },
  { id: 'database', label: 'Databases', icon: '🗄️', color: '#F59E0B' },
  { id: 'cloud', label: 'Cloud & DevOps', icon: '☁️', color: '#06B6D4' },
];

const LEVELS = ['Beginner', 'Beginner+', 'Intermediate', 'Intermediate+', 'Advanced', 'Advanced+', 'Expert', 'Expert+', 'Master', 'Master+'];

export default function SkillAssessment() {
  const { assessmentResults, saveAssessmentResult } = useApp();
  const [phase, setPhase] = useState('select'); // select | quiz | result
  const [selectedCat, setSelectedCat] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const startQuiz = (cat) => {
    setSelectedCat(cat);
    setCurrentQ(0);
    setAnswers({});
    setPhase('quiz');
  };

  const handleAnswer = (qIdx, optIdx) => {
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const submitQuiz = () => {
    const questions = ASSESSMENT_QUESTIONS[selectedCat.id];
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    const score = correct;
    const pct = Math.round((correct / questions.length) * 100);
    const level = LEVELS[Math.min(correct - 1, LEVELS.length - 1)];
    const r = { score, total: questions.length, pct, level, category: selectedCat.id, date: new Date().toLocaleDateString() };
    setResult(r);
    saveAssessmentResult(selectedCat.id, r);
    setPhase('result');
  };

  if (phase === 'select') {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ margin: '0 0 8px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
            Skill Assessment
          </h1>
          <p style={{ margin: 0, color: '#64748b' }}>Take a 10-question quiz to assess and verify your skills.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
          {CATEGORIES.map(cat => {
            const done = assessmentResults[cat.id];
            return (
              <div
                key={cat.id}
                onClick={() => startQuiz(cat)}
                className="card"
                style={{
                  padding: '1.5rem', cursor: 'pointer',
                  border: `1px solid ${done ? cat.color + '40' : '#1e293b'}`,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = cat.color + '60';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = done ? cat.color + '40' : '#1e293b';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{cat.icon}</div>
                <h3 style={{ margin: '0 0 4px', fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>{cat.label}</h3>
                <p style={{ margin: '0 0 1rem', fontSize: '0.75rem', color: '#64748b' }}>10 questions • ~5 min</p>
                {done ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle size={14} color={cat.color} />
                    <span style={{ fontSize: '0.8rem', color: cat.color, fontWeight: 600 }}>
                      {done.score}/{done.total} — {done.level}
                    </span>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '0.375rem 0.75rem', borderRadius: '0.5rem',
                    background: `${cat.color}10`, border: `1px solid ${cat.color}30`,
                    width: 'fit-content', fontSize: '0.8rem', fontWeight: 600, color: cat.color,
                  }}>
                    Start <ChevronRight size={13} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {Object.keys(assessmentResults).length > 0 && (
          <div className="card" style={{ marginTop: '1.5rem', padding: '1.25rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0' }}>Assessment History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {Object.entries(assessmentResults).map(([catId, r]) => {
                const cat = CATEGORIES.find(c => c.id === catId);
                return (
                  <div key={catId} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.5rem 0.75rem', background: '#0A0F18',
                    borderRadius: '0.5rem', border: '1px solid #1e293b',
                  }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span>{cat?.icon}</span>
                      <span style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>{cat?.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{r.date}</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: cat?.color }}>{r.pct}% — {r.level}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (phase === 'quiz') {
    const questions = ASSESSMENT_QUESTIONS[selectedCat.id];
    const q = questions[currentQ];
    const answered = answers[currentQ] !== undefined;
    const allAnswered = questions.every((_, i) => answers[i] !== undefined);

    return (
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.875rem', color: selectedCat.color, fontWeight: 600 }}>
              {selectedCat.icon} {selectedCat.label}
            </span>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>
              Question {currentQ + 1} of {questions.length}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {questions.map((_, i) => (
              <div key={i} style={{
                width: 24, height: 6, borderRadius: 3,
                background: i < currentQ ? selectedCat.color : i === currentQ ? `${selectedCat.color}60` : '#1e293b',
                transition: 'background 0.3s',
              }} />
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.1rem', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.5 }}>
            {q.question}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(currentQ, i)}
                style={{
                  padding: '0.875rem 1rem', borderRadius: '0.625rem', border: 'none',
                  cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem', transition: 'all 0.15s',
                  background: answers[currentQ] === i ? `${selectedCat.color}15` : '#0A0F18',
                  border: `1px solid ${answers[currentQ] === i ? selectedCat.color + '60' : '#1e293b'}`,
                  color: answers[currentQ] === i ? '#e2e8f0' : '#94a3b8',
                }}
              >
                <span style={{
                  display: 'inline-flex', width: 22, height: 22, borderRadius: '50%',
                  border: `1.5px solid ${answers[currentQ] === i ? selectedCat.color : '#334155'}`,
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 700, marginRight: 10,
                  color: answers[currentQ] === i ? selectedCat.color : '#64748b',
                  background: answers[currentQ] === i ? `${selectedCat.color}20` : 'transparent',
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setCurrentQ(p => Math.max(0, p - 1))}
            disabled={currentQ === 0}
            className="btn-secondary"
            style={{ opacity: currentQ === 0 ? 0.4 : 1 }}
          >
            Previous
          </button>
          {currentQ < questions.length - 1 ? (
            <button onClick={() => setCurrentQ(p => p + 1)} className="btn-primary">
              Next <ChevronRight size={14} />
            </button>
          ) : (
            <button
              onClick={submitQuiz}
              disabled={!allAnswered}
              className="btn-primary"
              style={{ background: selectedCat.color, opacity: allAnswered ? 1 : 0.5 }}
            >
              Submit Assessment
            </button>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const questions = ASSESSMENT_QUESTIONS[selectedCat.id];
    return (
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: `${selectedCat.color}20`, border: `2px solid ${selectedCat.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem', fontSize: '2.5rem',
          }}>
            {result.pct >= 70 ? '🎉' : result.pct >= 50 ? '💪' : '📚'}
          </div>
          <h2 style={{ margin: '0 0 8px', fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
            {result.score}/{result.total} Correct
          </h2>
          <div style={{ fontSize: '1rem', color: selectedCat.color, fontWeight: 600, marginBottom: 4 }}>
            {result.level}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{selectedCat.label}</div>

          <div style={{
            display: 'inline-block', marginTop: '1.5rem',
            padding: '0.5rem 1.5rem', borderRadius: '2rem',
            background: `${selectedCat.color}15`, border: `1px solid ${selectedCat.color}30`,
            fontSize: '1.75rem', fontWeight: 800, color: selectedCat.color,
            fontFamily: 'Inter, sans-serif',
          }}>
            {result.pct}%
          </div>
        </div>

        {/* Question review */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1.5rem' }}>
          {questions.map((q, i) => {
            const chosen = answers[i];
            const correct = q.correct;
            const isCorrect = chosen === correct;
            return (
              <div key={i} className="card" style={{ padding: '1rem', borderColor: isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {isCorrect ? <CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> : <XCircle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: 2 }} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.8rem', color: '#e2e8f0', marginBottom: 4 }}>{q.question}</div>
                    {!isCorrect && (
                      <div style={{ fontSize: '0.75rem', color: '#10B981' }}>
                        Correct: {q.options[correct]}
                      </div>
                    )}
                    {!isCorrect && chosen !== undefined && (
                      <div style={{ fontSize: '0.75rem', color: '#EF4444' }}>
                        Your answer: {q.options[chosen]}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => setPhase('select')} className="btn-secondary">
            <RotateCcw size={14} /> Back to categories
          </button>
          <button onClick={() => startQuiz(selectedCat)} className="btn-primary">
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  return null;
}
