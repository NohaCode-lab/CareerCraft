
import React from "react";

const formatSalary = (salaryRange) => {
  if (!salaryRange) return "Salary not specified";

  const { min, max, currency } = salaryRange;

  if (min && max) return `${min.toLocaleString()} - ${max.toLocaleString()} ${currency}`;
  if (min) return `From ${min.toLocaleString()} ${currency}`;
  if (max) return `Up to ${max.toLocaleString()} ${currency}`;

  return "Salary not specified";
};

const JobCard = ({ job, onSave, onApply, onSelect }) => {
  if (!job) return null;

  const {
    title,
    company,
    source,
    location,
    workMode,
    employmentType,
    seniority,
    salaryRange,
    description,
    requirements = [],
    postedAt,
    isSaved,
    isApplied,
  } = job;

  return (
    <article className="border rounded-lg p-4 space-y-3">
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm">
          {company} • {source}
        </p>
      </div>

      <div className="text-sm space-y-1">
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Work Mode:</strong> {workMode}</p>
        <p><strong>Employment Type:</strong> {employmentType}</p>
        <p><strong>Seniority:</strong> {seniority}</p>
        <p><strong>Salary:</strong> {formatSalary(salaryRange)}</p>
        <p><strong>Posted:</strong> {postedAt}</p>
      </div>

      <p className="text-sm">{description}</p>

      {requirements.length > 0 && (
        <div>
          <p className="font-medium mb-1">Requirements</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {requirements.map((requirement, index) => (
              <li key={`${title}-requirement-${index}`}>{requirement}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-2">
        <button
          type="button"
          onClick={() => onSelect?.(job)}
          className="border rounded px-3 py-2"
        >
          View Details
        </button>

        <button
          type="button"
          onClick={() => onSave?.(job.id)}
          className="border rounded px-3 py-2"
        >
          {isSaved ? "Unsave Job" : "Save Job"}
        </button>

        <button
          type="button"
          onClick={() => onApply?.(job.id)}
          className="border rounded px-3 py-2"
          disabled={isApplied}
        >
          {isApplied ? "Applied" : "Mark as Applied"}
        </button>
      </div>
    </article>
  );
};

export default JobCard;