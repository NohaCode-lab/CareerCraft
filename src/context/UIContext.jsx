import { useCallback, useMemo, useState } from "react";
import UIContext from "./ui-context";

function UIProvider({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });

    window.setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  const value = useMemo(
    () => ({
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
    }),
    [
      isSidebarOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      isModalOpen,
      openModal,
      closeModal,
      loading,
      toast,
      showToast,
      clearToast,
    ]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export default UIProvider;