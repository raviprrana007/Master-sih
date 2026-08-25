import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('sb_current_user');
    if (stored) {
      try { setCurrentUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = (userId) => {
    const user = MOCK_USERS[userId];
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('sb_current_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sb_current_user');
  };

  const switchUser = (userId) => {
    return login(userId);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
