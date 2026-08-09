import { useContext } from 'react';
import { UIContext } from '../context/UIContext';

const useUI = () => {
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

  const {
    isSidebarOpen = false,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    isModalOpen = false,
    openModal,
    closeModal,
    loading = false,
    setLoading,
    toast = null,
    showToast,
    clearToast,
  } = context;

  return {
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    isModalOpen,
    openModal,
    closeModal,
    loading,
    setLoading,
    toast,
    showToast,
    clearToast,
  };
};

export default useUI;
