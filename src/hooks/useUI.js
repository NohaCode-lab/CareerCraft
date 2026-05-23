import { useContext } from "react";
import UIContext from "../context/ui-context";

const useUI = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used within UIProvider");
  }

  const {
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
