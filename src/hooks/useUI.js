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
  };
};

export default useUI;