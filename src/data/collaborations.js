export const LIVE_PROJECTS = [
  {
    id: 'lp1', title: 'AI-Powered Resume Screener', type: 'Open Source',
    company: 'TechNova Solutions', color: '#06B6D4',
    skills: ['Python', 'NLP', 'React', 'FastAPI'], openSlots: 3, totalSlots: 8,
    deadline: '2026-10-20', difficulty: 'Intermediate',
    description: 'Build an AI tool to parse and rank resumes against job descriptions. Real production deployment.',
    reward: '₹15,000 stipend + PPO consideration',
  },
  {
    id: 'lp2', title: 'Campus EV Charging Network App', type: 'Social Impact',
    company: 'KIIT University', color: '#10B981',
    skills: ['React Native', 'Node.js', 'IoT', 'Maps API'], openSlots: 5, totalSlots: 10,
    deadline: '2026-10-31', difficulty: 'Beginner',
    description: 'App for tracking and booking campus EV charging stations. Real IoT integration.',
    reward: 'Certificate + Letter of Recommendation',
  },
  {
    id: 'lp3', title: 'Financial Fraud Detection System', type: 'Industry',
    company: 'Razorpay', color: '#3395FF',
    skills: ['Python', 'ML', 'Kafka', 'PostgreSQL'], openSlots: 2, totalSlots: 6,
    deadline: '2026-09-30', difficulty: 'Advanced',
    description: 'Real-time fraud detection using graph neural networks. Production-grade system.',
    reward: '₹25,000/month stipend + full-time offer potential',
  },
  {
    id: 'lp4', title: 'Mental Health Chatbot for Students', type: 'Social Impact',
    company: 'NIMHANS x IIT Bangalore', color: '#8B5CF6',
    skills: ['Python', 'LangChain', 'React', 'Empathy AI'], openSlots: 4, totalSlots: 8,
    deadline: '2026-11-15', difficulty: 'Intermediate',
    description: 'Build an empathetic AI chatbot for students in distress. Sensitive, safe, and research-backed.',
    reward: 'Research paper co-authorship + ₹10,000 grant',
  },
];

export const WORKSHOPS = [
  {
    id: 'w1', title: 'GenAI Application Development Bootcamp', organizer: 'Google Cloud',
    color: '#4285F4', type: 'Technical Workshop', mode: 'Online',
    date: '2026-09-28', duration: '2 days (16 hours)', seats: 200, registered: 147,
    skills: ['LangChain', 'Vertex AI', 'RAG', 'Python'],
    description: 'Hands-on bootcamp building production GenAI apps on Google Cloud. Certificate included.',
    price: 'Free (Invite only)',
    speaker: 'Google Cloud Developer Advocates',
  },
  {
    id: 'w2', title: 'System Design Masterclass', organizer: 'Zerodha Engineering',
    color: '#6366F1', type: 'Tech Talk + Workshop', mode: 'Hybrid',
    date: '2026-10-05', duration: '8 hours', seats: 150, registered: 134,
    skills: ['System Design', 'Databases', 'Caching', 'Microservices'],
    description: 'Deep dive into real Zerodha architecture decisions. Q&A with principal engineers.',
    price: '₹299',
    speaker: 'Kailash Nadh, CTO Zerodha',
  },
  {
    id: 'w3', title: 'Open Source Contribution Workshop', organizer: 'FOSSASIA',
    color: '#10B981', type: 'Workshop', mode: 'Online',
    date: '2026-10-12', duration: '4 hours', seats: 500, registered: 289,
    skills: ['Git', 'Open Source', 'GitHub', 'Code Review'],
    description: 'Learn to contribute to real open source projects. First PR guaranteed!',
    price: 'Free',
    speaker: 'Core maintainers from React, Linux, and Kubernetes',
  },
  {
    id: 'w4', title: 'Data Structures & Algorithms Intensive', organizer: 'Striver (TLE Eliminators)',
    color: '#F59E0B', type: 'Workshop', mode: 'Online',
    date: '2026-10-18', duration: '3 days', seats: 1000, registered: 892,
    skills: ['DSA', 'Competitive Programming', 'Dynamic Programming', 'Graphs'],
    description: 'SDE Interview prep focused DSA intensive by Striver. 3-day sprint for placement season.',
    price: '₹499',
    speaker: 'Raj Vikramaditya (Striver)',
  },
];

export const INNOVATION_CHALLENGES = [
  {
    id: 'ic1', title: 'Smart India Hackathon 2026', organizer: 'Government of India',
    color: '#FF6B35', prize: '₹1 Lakh - ₹5 Lakh', deadline: '2026-10-01',
    problemStatements: 42, registered: 125000, teamSize: '2-6',
    themes: ['Agriculture', 'Healthcare', 'Education', 'Smart Cities', 'Fintech'],
    description: 'India\'s largest hackathon. Solve real government problem statements.',
  },
  {
    id: 'ic2', title: 'Google Solution Challenge 2026', organizer: 'Google',
    color: '#4285F4', prize: '$3,000 - $10,000', deadline: '2026-09-30',
    problemStatements: null, registered: 85000, teamSize: '3-4',
    themes: ['UN Sustainable Development Goals'],
    description: 'Build solutions addressing UN SDGs using Google technologies.',
  },
  {
    id: 'ic3', title: 'TechNova Innovation Grand Prix', organizer: 'TechNova Solutions',
    color: '#06B6D4', prize: '₹2 Lakh + PPO', deadline: '2026-10-15',
    problemStatements: 5, registered: 3200, teamSize: '3-5',
    themes: ['AI/ML', 'SaaS', 'EdTech', 'FinTech'],
    description: 'Build innovative B2B SaaS solutions. Top teams get pre-placement offers.',
  },
  {
    id: 'ic4', title: 'IEEE Xtreme Programming Contest', organizer: 'IEEE',
    color: '#0056D2', prize: 'Global rank + medals', deadline: '2026-10-20',
    problemStatements: null, registered: 60000, teamSize: '1-3',
    themes: ['Competitive Programming', 'Algorithms'],
    description: '24-hour competitive programming contest. Global leaderboard. Prestige.',
  },
];
