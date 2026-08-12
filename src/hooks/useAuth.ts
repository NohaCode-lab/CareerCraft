import { useContext } from 'react';
import { AuthContext, AuthContextType, UserProfile } from '../context/AuthContext';

export type { UserProfile, AuthContextType };

const defaultUser: UserProfile = {
  name: 'Noha',
  email: 'noha@careercraft.io',
  title: 'Full Stack Engineer',
  location: 'Berlin, Germany',
  role: 'Developer',
};

export const useAuth = (): AuthContextType => {
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
