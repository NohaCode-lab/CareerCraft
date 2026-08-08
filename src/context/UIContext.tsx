import React, { useCallback, useMemo, useState } from "react";
import UIContext from "./ui-context";

export interface ToastState {
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

interface UIProviderProps {
  children: React.ReactNode;
}

function UIProvider({ children }: UIProviderProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

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

  const showToast = useCallback((message: string, type: ToastState["type"] = "success") => {
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

  return <UIContext.Provider value={value as any}>{children}</UIContext.Provider>;
}

export default UIProvider;
