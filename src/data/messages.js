export const CONVERSATIONS = [
  {
    id: 'conv-1',
    participant: { id: 'p1', name: 'Priya Krishnan', title: 'SDE-2 at Google', color: '#4285F4' },
    lastMessage: 'Sure! Send me your resume and I\'ll forward it to the hiring team.',
    lastTime: '10:32 AM',
    unread: 2,
    online: true,
  },
  {
    id: 'conv-2',
    participant: { id: 'p2', name: 'Aditya Verma', title: 'ML Engineer at Microsoft', color: '#00A4EF' },
    lastMessage: 'Great progress on the PyTorch project! Let\'s schedule a code review.',
    lastTime: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 'conv-3',
    participant: { id: 'p3', name: 'Sneha Rathore', title: 'Frontend Engineer at Flipkart', color: '#F74D07' },
    lastMessage: 'The React performance tips I sent you — did you try code splitting?',
    lastTime: 'Yesterday',
    unread: 1,
    online: true,
  },
  {
    id: 'conv-4',
    participant: { id: 'p4', name: 'Ananya Sharma', title: 'Recruiter at TechNova', color: '#06B6D4' },
    lastMessage: 'We have an opening that matches your profile perfectly. Interested?',
    lastTime: 'Monday',
    unread: 0,
    online: false,
  },
  {
    id: 'conv-5',
    participant: { id: 'p5', name: 'Dr. Priya Sharma', title: 'Professor at KIIT', color: '#10B981' },
    lastMessage: 'Come see me during office hours to discuss the research project.',
    lastTime: 'Monday',
    unread: 0,
    online: false,
  },
];

export const MESSAGES = {
  'conv-1': [
    { id: 'm1', senderId: 'p1', content: 'Hi! I saw your profile on SkillBridge. Your portfolio looks impressive!', time: '10:15 AM', isOwn: false },
    { id: 'm2', senderId: 'self', content: 'Thank you Priya! I\'ve been following Google\'s engineering blog for a while. I\'m interested in the SDE roles.', time: '10:18 AM', isOwn: true },
    { id: 'm3', senderId: 'p1', content: 'We do have a few openings. Your React + Node.js background is exactly what the team needs.', time: '10:22 AM', isOwn: false },
    { id: 'm4', senderId: 'self', content: 'That\'s amazing! What would the interview process look like?', time: '10:25 AM', isOwn: true },
    { id: 'm5', senderId: 'p1', content: '4 rounds: 1 online assessment (DSA), 2 technical interviews, 1 Googleyness + leadership. Usually takes 4-6 weeks.', time: '10:28 AM', isOwn: false },
    { id: 'm6', senderId: 'self', content: 'Could you share any prep resources you\'d recommend?', time: '10:30 AM', isOwn: true },
    { id: 'm7', senderId: 'p1', content: 'Sure! Send me your resume and I\'ll forward it to the hiring team.', time: '10:32 AM', isOwn: false },
  ],
  'conv-2': [
    { id: 'm8', senderId: 'p2', content: 'Saw your SentimentLens project on GitHub. Really impressive multilingual support!', time: 'Yesterday 2:00 PM', isOwn: false },
    { id: 'm9', senderId: 'self', content: 'Thanks Aditya! It was a challenging project — code-mixed text is really tricky.', time: 'Yesterday 2:15 PM', isOwn: true },
    { id: 'm10', senderId: 'p2', content: 'Have you considered fine-tuning IndicBERT? It might give you better accuracy on Indian languages.', time: 'Yesterday 2:20 PM', isOwn: false },
    { id: 'm11', senderId: 'self', content: 'I tried it but the compute requirements were too high for my setup. Any suggestions?', time: 'Yesterday 2:30 PM', isOwn: true },
    { id: 'm12', senderId: 'p2', content: 'Use quantization — 8-bit models on your GPU should cut memory usage by 75%. Let me share a notebook.', time: 'Yesterday 3:00 PM', isOwn: false },
    { id: 'm13', senderId: 'p2', content: 'Great progress on the PyTorch project! Let\'s schedule a code review.', time: 'Yesterday 3:30 PM', isOwn: false },
  ],
  'conv-3': [
    { id: 'm14', senderId: 'p3', content: 'How\'s the React learning going? Did you check out the React Query docs I mentioned?', time: 'Yesterday 11:00 AM', isOwn: false },
    { id: 'm15', senderId: 'self', content: 'Yes! React Query is a game changer for data fetching. My app\'s performance improved massively.', time: 'Yesterday 11:30 AM', isOwn: true },
    { id: 'm16', senderId: 'p3', content: 'The React performance tips I sent you — did you try code splitting?', time: 'Yesterday 12:00 PM', isOwn: false },
  ],
  'conv-4': [
    { id: 'm17', senderId: 'p4', content: 'Hi! I\'m Ananya from TechNova. We noticed your profile on SkillBridge.', time: 'Monday 10:00 AM', isOwn: false },
    { id: 'm18', senderId: 'self', content: 'Hello Ananya! Yes, I\'m actively looking for opportunities. What roles do you have?', time: 'Monday 10:30 AM', isOwn: true },
    { id: 'm19', senderId: 'p4', content: 'We have an opening that matches your profile perfectly. Interested?', time: 'Monday 11:00 AM', isOwn: false },
  ],
  'conv-5': [
    { id: 'm20', senderId: 'p5', content: 'Ravi, your recent assignment on distributed systems was excellent work.', time: 'Monday 9:00 AM', isOwn: false },
    { id: 'm21', senderId: 'self', content: 'Thank you Professor! I really enjoyed the MapReduce implementation.', time: 'Monday 9:30 AM', isOwn: true },
    { id: 'm22', senderId: 'p5', content: 'Come see me during office hours to discuss the research project.', time: 'Monday 10:00 AM', isOwn: false },
  ],
};
