import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const INITIAL_REQUESTS = [
  {
    id: 1, title: 'Need help', description: 'helpn needed',
    category: 'Web Development', urgency: 'High', status: 'Solved',
    tags: ['JavaScript', 'Debugging'],
    author: 'Kamran khan', location: 'Karachi', helpers: 1,
    aiSummary: 'Web Development request with high urgency. Best suited for members with relevant expertise.',
    helpersList: [{ name: 'Irfan Khan', skills: 'Figma, UI/UX, HTML/CSS', trust: 100, initials: 'AK', color: 'orange' }]
  },
  {
    id: 2, title: 'Need help making my portfolio responsive before demo day',
    description: 'My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.',
    category: 'Web Development', urgency: 'High', status: 'Solved',
    tags: ['HTML/CSS', 'Responsive', 'Portfolio'],
    author: 'Sara Noor', location: 'Karachi', helpers: 1,
    aiSummary: 'Responsive layout issue with a short deadline. Best helpers are frontend mentors comfortable with CSS grids and media queries.',
    helpersList: [
      { name: 'Irfan Khan', skills: 'Figma, UI/UX, HTML/CSS', trust: 100, initials: 'AK', color: 'orange' },
      { name: 'Kamran khan', skills: 'JavaScript, React, Git/GitHub', trust: 88, initials: 'HA', color: 'dark' }
    ]
  },
  {
    id: 3, title: 'Looking for Figma feedback on a volunteer event poster',
    description: 'I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.',
    category: 'Design', urgency: 'Medium', status: 'Open',
    tags: ['Figma', 'Poster', 'Design Review'],
    author: 'Irfan Khan', location: 'Lahore', helpers: 1,
    aiSummary: 'A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.',
    helpersList: [{ name: 'Kamran khan', skills: 'JavaScript, React, Git/GitHub', trust: 88, initials: 'HA', color: 'dark' }]
  },
  {
    id: 4, title: 'Need mock interview support for internship applications',
    description: 'Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.',
    category: 'Career', urgency: 'Low', status: 'Solved',
    tags: ['Interview Prep', 'Career', 'Frontend'],
    author: 'Sara Noor', location: 'Remote', helpers: 2,
    aiSummary: 'Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.',
    helpersList: [
      { name: 'Irfan Khan', skills: 'Figma, UI/UX, HTML/CSS', trust: 100, initials: 'IK', color: 'orange' },
      { name: 'Kamran Khan', skills: 'JavaScript, React, Git/GitHub', trust: 88, initials: 'kk', color: 'dark' }
    ]
  }
];

const INITIAL_USERS = [
  { name: 'Irfan Khan', initials: 'IK', color: 'orange', location: 'Karachi', role: 'Both', trustScore: 100, contributions: 35, skills: ['Figma', 'UI/UX', 'HTML/CSS', 'Career Guidance'], badges: ['Design Ally', 'Fast Responder', 'Top Mentor'], interests: 'Hackathons, UI/UX, Community Building' },
  { name: 'kamran khan', initials: 'KK', color: 'dark', location: 'Lahore', role: 'Can Help', trustScore: 88, contributions: 24, skills: ['JavaScript', 'React', 'Git/GitHub'], badges: ['Code Rescuer', 'Bug Hunter'], interests: 'Open Source, React, Mentoring' },
  { name: 'Imran khan', initials: 'IM', color: 'purple', location: 'Remote', role: 'Both', trustScore: 74, contributions: 11, skills: ['Python', 'Data Analysis'], badges: ['Community Voice'], interests: 'Data Science, ML, Community' }
];

const INITIAL_MESSAGES = [
  { id: 1, from: 'Irfan Khan', to: 'Sara Noor', text: 'I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.', time: '09:45 AM' },
  { id: 2, from: 'Kamran khan', to: 'Ayesha Khan', text: 'Your event poster concept is solid. I would tighten the CTA and reduce the background texture.', time: '11:10 AM' }
];

const INITIAL_NOTIFS = [
  { id: 1, title: '"Need help" was marked as solved', type: 'Status', time: 'Just now', read: false },
  { id: 2, title: 'Irfan Khan offered help on "Need help"', type: 'Match', time: 'Just now', read: false },
  { id: 3, title: 'Your request "Need help" is now live in the community feed', type: 'Request', time: 'Just now', read: false },
  { id: 4, title: '"Need help making my portfolio responsive before demo day" was marked as solved', type: 'Status', time: 'Just now', read: false },
  { id: 5, title: 'New helper matched to your responsive portfolio request', type: 'Match', time: '12 min ago', read: false },
  { id: 6, title: 'Your trust score increased after a solved request', type: 'Reputation', time: '1 hr ago', read: false },
  { id: 7, title: 'AI Center detected rising demand for interview prep', type: 'Insight', time: 'Today', read: true }
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hh_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('hh_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('hh_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('hh_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFS;
  });

  useEffect(() => { if (user) localStorage.setItem('hh_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('hh_requests', JSON.stringify(requests)); }, [requests]);
  useEffect(() => { localStorage.setItem('hh_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('hh_notifs', JSON.stringify(notifications)); }, [notifications]);

  const addRequest = (req) => {
    const newReq = { ...req, id: Date.now(), author: user?.name || 'You', helpers: 0, helpersList: [], status: 'Open' };
    setRequests(prev => [newReq, ...prev]);
    addNotif(`Your request "${req.title}" is now live in the community feed`, 'Request');
  };

  const markSolved = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Solved' } : r));
    const req = requests.find(r => r.id === id);
    if (req) addNotif(`"${req.title}" was marked as solved`, 'Status');
  };

  const iCanHelp = (id) => {
    setRequests(prev => prev.map(r => {
      if (r.id !== id) return r;
      const alreadyHelper = r.helpersList?.some(h => h.name === user?.name);
      if (alreadyHelper) return r;
      const newHelper = { name: user?.name, skills: user?.skills?.join(', ') || '', trust: user?.trustScore || 80, initials: user?.initials || 'U', color: 'teal' };
      return { ...r, helpers: r.helpers + 1, helpersList: [...(r.helpersList || []), newHelper] };
    }));
    addNotif(`You offered help — the requester has been notified!`, 'Match');
  };

  const sendMessage = (to, text) => {
    const msg = { id: Date.now(), from: user?.name || 'You', to, text, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [msg, ...prev]);
  };

  const addNotif = (title, type) => {
    setNotifications(prev => [{ id: Date.now(), title, type, time: 'Just now', read: false }, ...prev]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const login = (userData) => {
    const found = INITIAL_USERS.find(u => u.name === userData.name) || { ...userData, trustScore: 80, contributions: 0, badges: [], skills: [] };
    setUser({ ...found, ...userData });
  };

  const logout = () => { setUser(null); localStorage.removeItem('hh_user'); };

  return (
    <AppContext.Provider value={{ user, login, logout, requests, addRequest, markSolved, iCanHelp, messages, sendMessage, notifications, setNotifications, unreadCount, INITIAL_USERS }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
