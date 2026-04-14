
import { useMemo, useState } from "react";
import UIContext from "./ui-context";

function UIProvider({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      loading,
      setLoading,
      toast,
      showToast,
    }),
    [isSidebarOpen, loading, toast]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export default UIProvider;