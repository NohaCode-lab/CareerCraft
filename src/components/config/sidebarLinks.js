import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Heart,
  FolderKanban,
  MessageSquareText,
  Sparkles,
  Settings,
} from 'lucide-react';

export const SIDEBAR_LINKS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    id: 'cv-builder',
    label: 'CV Builder',
    path: '/cv-builder',
    icon: FileText,
  },
  {
    id: 'job-search',
    label: 'Job Search',
    path: '/job-search',
    icon: Briefcase,
  },
  {
    id: 'saved-jobs',
    label: 'Saved Jobs',
    path: '/saved-jobs',
    icon: Heart,
  },
  {
    id: 'applications',
    label: 'Applications',
    path: '/applications',
    icon: FolderKanban,
  },
  {
    id: 'interview-prep',
    label: 'Interview Prep',
    path: '/interview-prep',
    icon: MessageSquareText,
  },
  {
    id: 'ai-assistant',
    label: 'AI Assistant',
    path: '/ai-assistant',
    icon: Sparkles,
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];