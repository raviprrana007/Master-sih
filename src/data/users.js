export const MOCK_USERS = {
  'student-1': {
    id: 'student-1', name: 'Ravi Prakash Rana', email: 'ravi@student.com',
    role: 'student', title: 'Full Stack Developer', institution: 'KIIT University',
    department: 'Computer Science', year: '3rd Year', cgpa: 8.7,
    location: 'Bhubaneswar, Odisha', about: 'Passionate full-stack developer focused on React and Node.js. Building impactful products.',
    skills: ['React', 'JavaScript', 'Node.js', 'SQL', 'Git', 'Python', 'Tailwind CSS'],
    careerReadiness: 78, skillScore: 74, connections: 127, profileViews: 342,
    avatar: null, color: '#3B82F6',
  },
  'student-2': {
    id: 'student-2', name: 'Aarav Sharma', email: 'aarav@student.com',
    role: 'student', title: 'ML & Data Science Student', institution: 'IIT Bombay',
    department: 'Data Science', year: '2nd Year', cgpa: 9.1,
    location: 'Mumbai, Maharashtra', about: 'AI/ML enthusiast working on computer vision and NLP projects.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas', 'Scikit-learn'],
    careerReadiness: 71, skillScore: 82, connections: 89, profileViews: 215,
    avatar: null, color: '#8B5CF6',
  },
  'industry-1': {
    id: 'industry-1', name: 'Ananya Sharma', email: 'ananya@technova.com',
    role: 'industry', title: 'University Recruiter', company: 'TechNova Solutions',
    companySize: '2000-5000', industry: 'Technology', location: 'Bangalore, Karnataka',
    about: 'Leading campus recruitment at TechNova. Passionate about connecting talent with opportunity.',
    skills: ['Talent Acquisition', 'Campus Hiring', 'HR Analytics'],
    connections: 284, openPositions: 12,
    avatar: null, color: '#06B6D4',
  },
  'academician-1': {
    id: 'academician-1', name: 'Dr. Priya Sharma', email: 'priya@kiit.ac.in',
    role: 'academician', title: 'Associate Professor', department: 'Computer Science',
    institution: 'KIIT University', specialization: 'Machine Learning & AI',
    experience: '12 years', location: 'Bhubaneswar, Odisha',
    about: 'Researcher and educator in ML/AI. Bridging academia and industry through collaborative projects.',
    skills: ['Machine Learning', 'Research', 'Python', 'Deep Learning', 'NLP'],
    connections: 156, publications: 23, researchProjects: 5,
    avatar: null, color: '#10B981',
  },
  'institution-1': {
    id: 'institution-1', name: 'KIIT University', email: 'placements@kiit.ac.in',
    role: 'institution', title: 'Deemed University', location: 'Bhubaneswar, Odisha',
    about: 'Premier technology university with 30,000+ students and strong industry connections.',
    totalStudents: 31420, placementRate: 92, avgPackage: '8.4 LPA',
    industryPartners: 847, activeInternships: 234,
    avatar: null, color: '#F59E0B',
  },
};

export const DEMO_USERS = [
  { key: 'student-1', label: 'Ravi Prakash Rana', sub: 'Student • KIIT University' },
  { key: 'student-2', label: 'Aarav Sharma', sub: 'Student • IIT Bombay' },
  { key: 'industry-1', label: 'Ananya Sharma', sub: 'Recruiter • TechNova' },
  { key: 'academician-1', label: 'Dr. Priya Sharma', sub: 'Professor • KIIT University' },
  { key: 'institution-1', label: 'KIIT University', sub: 'Institution' },
];

export const ROLE_CREDENTIALS = {
  student: { email: 'ravi@student.com', password: 'demo123', userId: 'student-1' },
  student2: { email: 'aarav@student.com', password: 'demo123', userId: 'student-2' },
  industry: { email: 'ananya@technova.com', password: 'demo123', userId: 'industry-1' },
  academician: { email: 'priya@kiit.ac.in', password: 'demo123', userId: 'academician-1' },
  institution: { email: 'placements@kiit.ac.in', password: 'demo123', userId: 'institution-1' },
};
