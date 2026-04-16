
import React from "react";
import { jobFilters } from "../data/jobs/filters";
import { jobTypes } from "../data/jobs/jobTypes";

const defaultFilters = {
  search: "",
  country: "",
  seniority: "",
  workMode: "",
  employmentType: "",
  savedOnly: false,
  appliedOnly: false,
};

const JobFilters = ({ filters = defaultFilters, onChange, onReset }) => {
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    onChange?.({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <section className="border rounded-lg p-4 space-y-4">
      <div>
        <label className="block mb-1 font-medium" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          name="search"
          type="text"
          value={filters.search}
          onChange={handleInputChange}
          placeholder="Search by title, company, or location"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block mb-1 font-medium" htmlFor="country">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={filters.country}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">All countries</option>
            {jobFilters.countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="seniority">
            Seniority
          </label>
          <select
            id="seniority"
            name="seniority"
            value={filters.seniority}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">All levels</option>
            {jobFilters.seniorityLevels.map((level) => (
              <option key={level.id} value={level.label}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="workMode">
            Work mode
          </label>
          <select
            id="workMode"
            name="workMode"
            value={filters.workMode}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">All work modes</option>
            {jobFilters.workModes.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="employmentType">
            Employment type
          </label>
          <select
            id="employmentType"
            name="employmentType"
            value={filters.employmentType}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">All types</option>
            {jobTypes.map((type) => (
              <option key={type.id} value={type.label}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="savedOnly"
            checked={filters.savedOnly}
            onChange={handleInputChange}
          />
          Saved only
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="appliedOnly"
            checked={filters.appliedOnly}
            onChange={handleInputChange}
          />
          Applied only
        </label>
      </div>

      <div>
        <button
          type="button"
          onClick={onReset}
          className="border rounded px-3 py-2"
        >
          Reset Filters
        </button>
      </div>
    </section>
  );
};

export default JobFilters;