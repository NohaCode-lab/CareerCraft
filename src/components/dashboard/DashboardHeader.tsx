import React from 'react';
import useLanguage from '../../hooks/useLanguage';

const getGreetingByHour = (hour: number, lang: string): string => {
  if (lang === 'de') {
    if (hour < 12) return 'Guten Morgen';
    if (hour < 18) return 'Guten Tag';
    return 'Guten Abend';
  }

  if (lang === 'ar') {
    if (hour < 12) return 'صباح الخير';
    return 'مساء الخير';
  }

  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

interface DashboardHeaderProps {
  userName?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName = 'Noha' }) => {
  const { language } = useLanguage();
  const currentHour = new Date().getHours();
  const greeting = getGreetingByHour(currentHour, language);

  const titles: Record<string, { welcome: string; description: string; tag: string }> = {
    en: {
      welcome: 'Welcome back to CareerCraft',
      description: 'Track your applications, improve your CV, prepare for interviews, and stay focused on your next opportunity.',
      tag: 'Career growth in progress',
    },
    de: {
      welcome: 'Willkommen zurück bei CareerCraft',
      description: 'Verfolgen Sie Bewerbungen, optimieren Sie Ihren Lebenslauf und bereiten Sie sich auf Vorstellungsgespräche vor.',
      tag: 'Karrierewachstum aktiv',
    },
    ar: {
      welcome: 'مرحباً بك مجدداً في كاريير كرافت',
      description: 'تتبع طلبات التوظيف، حسّن سيرتك الذاتية، واستعد للمقابلات المهنية بكل ثقة.',
      tag: 'النمو المهني في تقدم',
    },
  };

  const currentContent = titles[language] || titles.en;

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8 dark:border-white/10 dark:bg-slate-900"
      aria-label="Dashboard overview"
    >
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-cyan-500/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 opacity-90" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            {greeting}, {userName}
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl xl:text-4xl">
            {currentContent.welcome}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 md:text-base">
            {currentContent.description}
          </p>
        </div>

        <div
          className="self-start rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200"
          role="status"
        >
          {currentContent.tag}
        </div>
      </div>
    </section>
  );
};

export default DashboardHeader;
