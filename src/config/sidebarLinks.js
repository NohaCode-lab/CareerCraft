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
import { ROUTES } from './routes';

export const SIDEBAR_LINKS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    id: 'cv-builder',
    label: 'CV Builder',
    path: ROUTES.CV_BUILDER,
    icon: FileText,
  },
  {
    id: 'job-search',
    label: 'Job Search',
    path: ROUTES.JOB_SEARCH,
    icon: Briefcase,
  },
  {
    id: 'saved-jobs',
    label: 'Saved Jobs',
    path: ROUTES.SAVED_JOBS,
    icon: Heart,
  },
  {
    id: 'applications',
    label: 'Applications',
    path: ROUTES.APPLICATIONS,
    icon: FolderKanban,
  },
  {
    id: 'interview-prep',
    label: 'Interview Prep',
    path: ROUTES.INTERVIEW_PREP,
    icon: MessageSquareText,
  },
  {
    id: 'ai-assistant',
    label: 'AI Assistant',
    path: ROUTES.AI_ASSISTANT,
    icon: Sparkles,
  },
  {
    id: 'settings',
    label: 'Settings',
    path: ROUTES.SETTINGS,
    icon: Settings,
  },
];