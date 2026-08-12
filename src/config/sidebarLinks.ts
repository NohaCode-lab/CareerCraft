import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Heart,
  FolderKanban,
  MessageSquareText,
  Sparkles,
  Settings,
  LucideIcon,
} from 'lucide-react';
import { ROUTES, RoutePath } from './routes';

export interface SidebarLink {
  id: string;
  label: string;
  path: RoutePath;
  icon: LucideIcon;
  tKey?: string;
}

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    tKey: 'dashboard',
  },
  {
    id: 'cv-builder',
    label: 'CV Builder',
    path: ROUTES.CV_BUILDER,
    icon: FileText,
    tKey: 'cvBuilder',
  },
  {
    id: 'job-search',
    label: 'Job Search',
    path: ROUTES.JOB_SEARCH,
    icon: Briefcase,
    tKey: 'jobSearch',
  },
  {
    id: 'saved-jobs',
    label: 'Saved Jobs',
    path: ROUTES.SAVED_JOBS,
    icon: Heart,
    tKey: 'savedJobs',
  },
  {
    id: 'applications',
    label: 'Applications',
    path: ROUTES.APPLICATIONS,
    icon: FolderKanban,
    tKey: 'applications',
  },
  {
    id: 'interview-prep',
    label: 'Interview Prep',
    path: ROUTES.INTERVIEW_PREP,
    icon: MessageSquareText,
    tKey: 'interviewPrep',
  },
  {
    id: 'ai-assistant',
    label: 'AI Assistant',
    path: ROUTES.AI_ASSISTANT,
    icon: Sparkles,
    tKey: 'aiAssistant',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: ROUTES.SETTINGS,
    icon: Settings,
    tKey: 'settings',
  },
];
