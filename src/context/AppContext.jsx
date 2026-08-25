import { createContext, useContext, useState, useEffect } from 'react';
import { POSTS } from '../data/posts';
import { CONVERSATIONS, MESSAGES as INITIAL_MESSAGES } from '../data/messages';
import { PROFESSOR_WORDS } from '../data/professorWords';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [connections, setConnections] = useState(() => {
    try {
      const stored = localStorage.getItem('sb_connections');
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  const [applications, setApplications] = useState(() => {
    try {
      const stored = localStorage.getItem('sb_applications');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const stored = localStorage.getItem('sb_saved_jobs');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [savedInternships, setSavedInternships] = useState(() => {
    try {
      const stored = localStorage.getItem('sb_saved_internships');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [notifications, setNotifications] = useState([
    { id: 'n1', type: 'connection', message: 'Priya Krishnan (Google SDE-2) wants to connect', time: '10m ago', read: false, icon: 'user' },
    { id: 'n2', type: 'application', message: 'Your application to TechNova Solutions was viewed', time: '2h ago', read: false, icon: 'briefcase' },
    { id: 'n3', type: 'match', message: 'New internship match: Google SWE Intern (94% match)', time: '5h ago', read: false, icon: 'star' },
    { id: 'n4', type: 'message', message: 'Aditya Verma sent you a message about ML resources', time: '1d ago', read: true, icon: 'message' },
    { id: 'n5', type: 'achievement', message: 'You completed the Frontend Assessment — Score: 8/10', time: '2d ago', read: true, icon: 'award' },
    { id: 'n6', type: 'connection', message: 'Your connection request to Sneha Rathore was accepted', time: '3d ago', read: true, icon: 'user' },
  ]);

  const [posts, setPosts] = useState(POSTS);
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const [professorWords, setProfessorWords] = useState(() => {
    try {
      const stored = localStorage.getItem('sb_professor_words');
      return stored ? JSON.parse(stored) : PROFESSOR_WORDS;
    } catch { return PROFESSOR_WORDS; }
  });

  const [assessmentResults, setAssessmentResults] = useState(() => {
    try {
      const stored = localStorage.getItem('sb_assessment_results');
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('sb_theme') || 'light'; } catch { return 'light'; }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('sb_connections', JSON.stringify(connections));
  }, [connections]);

  useEffect(() => {
    localStorage.setItem('sb_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('sb_saved_jobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem('sb_saved_internships', JSON.stringify(savedInternships));
  }, [savedInternships]);

  useEffect(() => {
    localStorage.setItem('sb_professor_words', JSON.stringify(professorWords));
  }, [professorWords]);

  useEffect(() => {
    localStorage.setItem('sb_assessment_results', JSON.stringify(assessmentResults));
  }, [assessmentResults]);

  // Apply theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('sb_theme', theme);
  }, [theme]);

  // Connection actions
  const connectPerson = (personId) => {
    setConnections(prev => ({ ...prev, [personId]: 'pending' }));
    addNotification({ type: 'connection', message: 'Connection request sent!', icon: 'user' });
  };

  const acceptConnection = (personId) => {
    setConnections(prev => ({ ...prev, [personId]: 'connected' }));
  };

  const getConnectionStatus = (personId) => connections[personId] || 'none';

  // Application actions
  const applyToOpportunity = (item, type) => {
    const existing = applications.find(a => a.id === item.id && a.type === type);
    if (!existing) {
      setApplications(prev => [...prev, {
        id: item.id, type, title: item.title, company: item.company,
        companyColor: item.companyColor, appliedDate: new Date().toLocaleDateString('en-IN'),
        status: 'Applied', matchScore: item.matchScore,
      }]);
      addNotification({ type: 'application', message: `Applied to ${item.title} at ${item.company}!`, icon: 'briefcase' });
    }
  };

  const hasApplied = (id, type) => applications.some(a => a.id === id && a.type === type);

  // Save job/internship
  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]);
  };

  const toggleSaveInternship = (intId) => {
    setSavedInternships(prev => prev.includes(intId) ? prev.filter(id => id !== intId) : [...prev, intId]);
  };

  const isJobSaved = (jobId) => savedJobs.includes(jobId);
  const isInternshipSaved = (intId) => savedInternships.includes(intId);

  // Notifications
  const addNotification = (notification) => {
    const newNotif = {
      id: `n${Date.now()}`,
      time: 'just now',
      read: false,
      ...notification,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Posts actions
  const togglePostLike = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const liked = p.likedByMe;
      return { ...p, likes: liked ? p.likes - 1 : p.likes + 1, likedByMe: !liked };
    }));
  };

  const togglePostSave = (postId) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, saved: !p.saved } : p));
  };

  const addComment = (postId, comment) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        comments: [...p.comments, {
          id: `c${Date.now()}`,
          author: 'You',
          content: comment,
          time: 'just now',
          color: '#3B82F6',
        }],
      };
    }));
  };

  // Messages actions
  const sendMessage = (convId, content) => {
    const newMsg = { id: `m${Date.now()}`, senderId: 'self', content, time: 'just now', isOwn: true };
    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMsg],
    }));
    setConversations(prev => prev.map(c =>
      c.id === convId ? { ...c, lastMessage: content, lastTime: 'just now', unread: 0 } : c
    ));
  };

  // Professor words
  const publishProfessorWord = (word) => {
    const newWord = {
      id: Date.now(),
      ...word,
      date: 'just now',
      likes: 0,
    };
    setProfessorWords(prev => [newWord, ...prev]);
  };

  // Assessment results
  const saveAssessmentResult = (category, result) => {
    setAssessmentResults(prev => ({ ...prev, [category]: result }));
  };

  return (
    <AppContext.Provider value={{
      connections, connectPerson, acceptConnection, getConnectionStatus,
      applications, applyToOpportunity, hasApplied,
      savedJobs, savedInternships, toggleSaveJob, toggleSaveInternship, isJobSaved, isInternshipSaved,
      notifications, addNotification, markNotificationRead, markAllNotificationsRead, clearNotifications, unreadCount,
      posts, togglePostLike, togglePostSave, addComment,
      conversations, messages, sendMessage,
      professorWords, publishProfessorWord,
      assessmentResults, saveAssessmentResult,
      theme, setTheme,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
