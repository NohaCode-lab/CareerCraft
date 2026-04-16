
import React, { useMemo } from "react";
import { mockJobs } from "../data/jobs/mockJobs";
import { mockApplications } from "../data/applications/mockApplications";

const getMatchScore = (job) => {
  let score = 50;

  const title = job.title.toLowerCase();
  const requirements = (job.requirements || []).join(" ").toLowerCase();
  const description = (job.description || "").toLowerCase();

  if (title.includes("frontend")) score += 15;
  if (title.includes("react")) score += 20;
  if (title.includes("ui")) score += 10;

  if (requirements.includes("react")) score += 10;
  if (requirements.includes("javascript")) score += 5;
  if (requirements.includes("css")) score += 5;
  if (description.includes("responsive")) score += 5;

  if (job.remote) score += 5;
  if (job.country === "DE" || job.country === "NL" || job.country === "EU") score += 5;

  return Math.min(score, 100);
};

const JobMatch = () => {
  const matchedJobs = useMemo(() => {
    const appliedJobIds = new Set(
      mockApplications
        .filter((application) => application.jobId)
        .map((application) => application.jobId)
    );

    return mockJobs
      .map((job) => ({
        ...job,
        matchScore: getMatchScore(job),
      }))
      .filter((job) => !appliedJobIds.has(job.id))
      .sort((firstJob, secondJob) => secondJob.matchScore - firstJob.matchScore)
      .slice(0, 5);
  }, []);

  return (
    <section className="border rounded-lg p-4 space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Top Job Matches</h2>
        <p className="text-sm">
          Suggested matches based on your frontend and React-focused target roles.
        </p>
      </div>

      {matchedJobs.length === 0 ? (
        <p>No job matches available right now.</p>
      ) : (
        <div className="space-y-3">
          {matchedJobs.map((job) => (
            <article key={job.id} className="border rounded p-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm">
                    {job.company} • {job.location}
                  </p>
                </div>

                <div className="text-sm font-medium">
                  Match: {job.matchScore}%
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default JobMatch;