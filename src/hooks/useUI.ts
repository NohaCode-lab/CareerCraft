import { useContext } from 'react';
import { UIContext, UIContextType } from '../context/UIContext';

export type { UIContextType };

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);

  if (!context) {
    return {
      isSidebarOpen: false,
      openSidebar: () => {},
      closeSidebar: () => {},
      toggleSidebar: () => {},
      isModalOpen: false,
      openModal: () => {},
      closeModal: () => {},
      loading: false,
      setLoading: () => {},
      toast: null,
      showToast: () => {},
      clearToast: () => {},
    };
  }

  return context;
};

export default useUI;
