import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, User, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../../components/ui/Avatar';

const QUICK_QUESTIONS = [
  'Which internships match my profile best?',
  'What skills should I learn next?',
  'Who should I connect with for my career?',
  'How can I improve my career readiness score?',
  'What companies are actively hiring for my skills?',
  'How does my profile compare to peers?',
];

function generateAIResponse(question, user) {
  const skills = user?.skills || [];
  const readiness = user?.careerReadiness || 78;

  if (question.toLowerCase().includes('internship')) {
    return `Based on your profile at ${user?.institution || 'your institution'} with skills in ${skills.slice(0, 3).join(', ')}, here are your top internship matches:\n\n**1. TechNova Solutions — Full Stack Intern (92% match)**\nYour React and Node.js skills are exactly what they need. The remote work option suits your location.\n\n**2. Google — SWE Intern (89% match)**\nStrong algorithmic thinking required. Practice LeetCode medium problems for 2-3 weeks before applying.\n\n**3. Amazon — SDE Intern (85% match)**\nFocus on Java and system design concepts. Their OA is doable with your current preparation level.\n\n**Action plan:** Apply to TechNova immediately (deadline: Sep 30). Spend 3 weeks on DSA prep, then apply to Google and Amazon.`;
  }
  if (question.toLowerCase().includes('skill')) {
    return `Based on industry demand and your current profile, here's your personalized skill development roadmap:\n\n**High Priority (learn in 1-2 months):**\n• **AWS Cloud Practitioner** — 90% demand, you're at 40%. This single skill increases your market value by ~35%.\n• **TypeScript** — 85% demand, you're at 60%. Extends your existing JS/React skills.\n\n**Medium Priority (3-4 months):**\n• **Docker & Kubernetes** — Cloud-native development is mandatory for senior roles.\n• **System Design** — Required for all FAANG-level interviews.\n\n**Stay current:**\n• LLM APIs (LangChain) — GenAI skills add 40% salary premium in 2026.\n\nRecommended: Start with AWS + TypeScript simultaneously. 2 hours/day for 6 weeks.`;
  }
  if (question.toLowerCase().includes('connect') || question.toLowerCase().includes('network')) {
    return `Based on your career goals in ${user?.department || 'tech'}, here are the most strategic connections:\n\n**Recruiters (immediate opportunity):**\n• Ananya Sharma (TechNova) — actively hiring for your stack\n• Priya Krishnan (Google SDE-2) — offered to forward resumes\n\n**Mentors (long-term growth):**\n• Aditya Verma (Microsoft ML Engineer) — aligned with your ML interest\n• Sneha Rathore (Flipkart Frontend) — same React specialization, 2 years ahead\n\n**Peers:**\n• Rahul Nair (IIT Madras) — competitive programming ace, great for interview prep\n\n**Action:** Send personalized connection requests with a specific ask (not just "connect"). Example: "Hi Priya, saw your recent post about Google hiring. I'm a React+Node developer at KIIT. Would love to chat about the SDE role."`;
  }
  if (question.toLowerCase().includes('readiness') || question.toLowerCase().includes('improve')) {
    return `Your career readiness is at ${readiness}%. Here's how to reach ${Math.min(100, readiness + 15)}% in 60 days:\n\n**Currently holding you back:**\n• ❌ AWS skills gap (your biggest opportunity)\n• ❌ No system design assessment completed\n• ❌ Only ${user?.connections || 127} connections (target: 200+)\n\n**Your strengths to leverage:**\n• ✅ Strong React + Node.js foundation\n• ✅ CGPA ${user?.cgpa || 8.7} (above most cutoffs)\n• ✅ Active on SkillBridge (profile views: ${user?.profileViews || 342})\n\n**60-day action plan:**\n1. Week 1-2: Complete AWS Cloud Practitioner\n2. Week 3-4: System Design Interview prep (Educative.io)\n3. Week 5-6: Apply to 10 internships\n4. Week 7-8: Network with 5 industry professionals\n\nEstimated readiness after completion: ${Math.min(100, readiness + 15)}%`;
  }
  if (question.toLowerCase().includes('compan') || question.toLowerCase().includes('hiring')) {
    return `Companies actively hiring for your skill set right now:\n\n**Immediate opportunities:**\n• **TechNova Solutions** — 12 open roles, explicit React+Node requirements. Ananya Sharma is your insider contact.\n• **Razorpay** — 9 backend roles, Go + PostgreSQL preferred but Node.js accepted.\n• **Flipkart** — 28 roles across all stacks, data science and backend strong.\n\n**Big tech (1-2 month prep needed):**\n• Google, Microsoft, Amazon — all have active campus programs. Application deadlines: Oct-Nov.\n\n**Emerging opportunities:**\n• AI startups (Sarvam AI, Krutrim, Niru.AI) — huge demand for full-stack + ML hybrid profiles.\n\n**Tip:** Set up job alerts on SkillBridge for your top 5 companies. New roles are added daily.`;
  }
  if (question.toLowerCase().includes('compar') || question.toLowerCase().includes('peer')) {
    return `How you compare to students with similar profiles:\n\n**You're ahead of 72% of peers in:**\n• React + Node.js proficiency (80% vs avg 61%)\n• Profile completeness (87% vs avg 64%)\n• Network size (${user?.connections || 127} vs avg 89)\n\n**You're behind 40% of peers in:**\n• AWS/Cloud skills (40% vs avg 55%)\n• Applications submitted (target: 10+)\n• Assessment completion rate (3/5 categories done)\n\n**Benchmarks for your target companies:**\n• Google intern candidates: avg CGPA 9.0, 500+ LeetCode solved\n• TechNova candidates: avg CGPA 7.8, strong project portfolio\n• Razorpay candidates: strong DSA + system design basics\n\n**Bottom line:** You're competitive for mid-tier companies now. 6-8 weeks of focused prep will make you competitive for FAANG.`;
  }

  return `Great question! Based on your profile as a ${user?.year || '3rd Year'} student at ${user?.institution || 'your university'} with skills in ${skills.slice(0, 3).join(', ')}, here's my analysis:\n\nYour career readiness score of ${readiness}% puts you in a strong position for internship applications. Your primary advantages are your React and Node.js skills, which are highly in-demand in the market right now.\n\nThe key areas I'd focus on for the next 30 days:\n1. Close your AWS skill gap (it's your biggest opportunity)\n2. Apply to at least 5 internships before October\n3. Connect with 2-3 industry professionals in your target companies\n\nWould you like specific recommendations on any of these areas?`;
}

export default function CareerIntelligence() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: `Hi ${currentUser?.name?.split(' ')[0] || 'there'}! I'm your AI career advisor, powered by SkillBridge Intelligence.\n\nI've analyzed your profile and I'm ready to help you make smarter career decisions. Ask me anything about internships, skills, networking, or your career path — or pick a quick question below.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    const response = generateAIResponse(text, currentUser);
    setMessages(prev => [...prev, { role: 'ai', content: response }]);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', minHeight: 500 }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Sparkles size={18} color="#8B5CF6" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
              Career Intelligence
            </h1>
            <div style={{ fontSize: '0.75rem', color: '#8B5CF6' }}>AI-powered career advisor</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
            {msg.role === 'ai' ? (
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={14} color="#8B5CF6" />
              </div>
            ) : (
              <Avatar name={currentUser?.name} color={currentUser?.color} size="sm" />
            )}
            <div style={{
              maxWidth: '75%',
              padding: '0.875rem 1rem', borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '0.25rem 1rem 1rem 1rem',
              background: msg.role === 'user' ? '#3B82F6' : '#141D2A',
              border: msg.role === 'ai' ? '1px solid #1e293b' : 'none',
              fontSize: '0.875rem', color: '#e2e8f0', lineHeight: 1.6,
              whiteSpace: 'pre-line',
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={14} color="#8B5CF6" />
            </div>
            <div style={{
              padding: '0.875rem 1rem', borderRadius: '0.25rem 1rem 1rem 1rem',
              background: '#141D2A', border: '1px solid #1e293b',
              display: 'flex', gap: 6, alignItems: 'center',
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#8B5CF6',
                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      <div style={{ marginBottom: '0.875rem' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {QUICK_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={loading}
              style={{
                padding: '0.375rem 0.75rem', borderRadius: '2rem',
                border: '1px solid #243044', background: '#0A0F18',
                color: '#94a3b8', fontSize: '0.75rem', cursor: 'pointer',
                transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.color = '#3B82F6'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#243044'; e.currentTarget.style.color = '#94a3b8'; }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          className="input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage(input))}
          placeholder="Ask me anything about your career..."
          disabled={loading}
          style={{ flex: 1 }}
        />
        <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
