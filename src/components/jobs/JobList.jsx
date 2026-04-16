
import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs = [], onSave, onApply, onSelect }) => {
  if (!jobs.length) {
    return (
      <div className="border rounded-lg p-4">
        <p>No jobs found.</p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
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