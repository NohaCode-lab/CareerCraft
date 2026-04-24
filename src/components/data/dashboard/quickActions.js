import {
  FileText,
  Search,
  ClipboardList,
  MessageSquare,
} from 'lucide-react';

// ==============================
// Dashboard Quick Actions
// ==============================

export const quickActions = [
  {
    id: 'build-cv',
    title: 'Build CV',
    description: 'Create or update your professional resume.',
    path: '/cv-builder',
    icon: FileText,
  },
  {
    id: 'search-jobs',
    title: 'Search Jobs',
    description: 'Explore new frontend and remote job opportunities.',
    path: '/job-search',
    icon: Search,
  },
  {
    id: 'track-applications',
    title: 'Track Applications',
    description: 'Monitor your application progress in one place.',
    path: '/applications',
    icon: ClipboardList,
  },
  {
    id: 'prepare-interview',
    title: 'Interview Prep',
    description: 'Practice questions and improve your answers.',
    path: '/interview-prep',
    icon: MessageSquare,
  },
];