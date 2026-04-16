
import React from 'react';
import StatusBadge from './StatusBadge';

const ApplicationDetailsModal = ({ isOpen, application, onClose }) => {
  if (!isOpen || !application) {
    return null;
  }

  const {
    role,
    company,
    location,
    status,
    appliedAt,
    notes,
    jobType,
    salary,
  } = application;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {role || 'Untitled Role'}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {company || 'Unknown Company'}
            </p>
          </div>

          <StatusBadge status={status} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Location
            </p>
            <p className="mt-2 text-sm text-slate-800">
              {location || 'Not specified'}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Applied Date
            </p>
            <p className="mt-2 text-sm text-slate-800">
              {appliedAt || 'Not specified'}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Job Type
            </p>
            <p className="mt-2 text-sm text-slate-800">
              {jobType || 'Not specified'}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Salary
            </p>
            <p className="mt-2 text-sm text-slate-800">
              {salary || 'Not specified'}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Notes
          </p>
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
            {notes || 'No notes available for this application.'}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;