import { createContext } from 'react';

export interface ToastState {
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

export interface UIContextType {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  toast: ToastState | null;
  showToast: (message: string, type?: ToastState["type"]) => void;
  clearToast: () => void;
}

export const UIContext = createContext<UIContextType | undefined>(undefined);
export { default } from './UIContext.tsx';
