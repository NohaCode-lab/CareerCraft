
import React from "react";

const SavedJobCard = ({ job, onUnsave, onApply, onSelect }) => {
  if (!job) return null;

  return (
    <article className="border rounded-lg p-4 space-y-3">
      <div>
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-sm">
          {job.company} • {job.location}
        </p>
      </div>

      <div className="text-sm space-y-1">
        <p><strong>Work Mode:</strong> {job.workMode}</p>
        <p><strong>Employment Type:</strong> {job.employmentType}</p>
        <p><strong>Source:</strong> {job.source}</p>
        <p><strong>Posted:</strong> {job.postedAt}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelect?.(job)}
          className="border rounded px-3 py-2"
        >
          View Details
        </button>

        <button
          type="button"
          onClick={() => onApply?.(job.id)}
          className="border rounded px-3 py-2"
          disabled={job.isApplied}
        >
          {job.isApplied ? "Applied" : "Apply"}
        </button>

        <button
          type="button"
          onClick={() => onUnsave?.(job.id)}
          className="border rounded px-3 py-2"
        >
          Remove Saved
        </button>
      </div>
    </article>
  );
};

export default SavedJobCard;