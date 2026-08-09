import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const defaultUser = {
  name: 'Noha',
  email: 'noha@careercraft.io',
  title: 'Full Stack Engineer',
  location: 'Berlin, Germany',
  summary: 'Passionate software developer building intelligent career tools.',
  skills: ['React', 'TypeScript', 'TailwindCSS', 'Node.js', 'Python'],
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    return {
      user: defaultUser,
      isAuthenticated: true,
      login: () => {},
      logout: () => {},
      updateUser: () => {},
    };
  }

  const {
    user = defaultUser,
    isAuthenticated = true,
    login,
    logout,
    updateUser,
  } = context;

  return {
    user: user || defaultUser,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };
};

export default useAuth;
