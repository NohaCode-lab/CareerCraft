import React from 'react';
import JobCard from './JobCard';

const JobList = ({ jobs = [], onSave, onApply, onSelect }) => {
  if (!jobs.length) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/3 p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-white">No jobs found</h3>
        <p className="mt-2 text-sm text-slate-400">
          Try adjusting your filters or search keywords.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onSave={onSave}
          onApply={onApply}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
};

export default JobList;