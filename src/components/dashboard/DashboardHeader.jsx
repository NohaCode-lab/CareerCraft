import React from 'react';

const DashboardHeader = ({ userName = 'Noha' }) => {
  const currentHour = new Date().getHours();

  let greeting = 'Good evening';

  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Good afternoon';
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl md:p-8">
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 opacity-90" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-medium text-slate-300">
            {greeting}, {userName}
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl xl:text-4xl">
            Welcome back to CareerCraft
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400 md:text-base">
            Track your applications, improve your CV, prepare for interviews,
            and stay focused on your next opportunity.
          </p>
        </div>

        <div className="self-start rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200">
          Career growth in progress
        </div>
      </div>
    </section>
  );
};

export default DashboardHeader;