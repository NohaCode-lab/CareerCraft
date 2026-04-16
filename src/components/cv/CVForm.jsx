
import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const defaultCV = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  skills: '',
};

const CVForm = () => {
  const [cvData, setCvData] = useLocalStorage('cvData', defaultCV);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCvData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="card-base p-6">
      <h2 className="section-title mb-6">CV Information</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Full Name */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={cvData.fullName}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
        />

        {/* Job Title */}
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={cvData.title}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={cvData.email}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={cvData.phone}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={cvData.location}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {/* Summary */}
      <textarea
        name="summary"
        placeholder="Professional Summary"
        value={cvData.summary}
        onChange={handleChange}
        rows={4}
        className="mt-4 w-full rounded-lg border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
      />

      {/* Skills */}
      <textarea
        name="skills"
        placeholder="Skills (comma separated)"
        value={cvData.skills}
        onChange={handleChange}
        rows={3}
        className="mt-4 w-full rounded-lg border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
      />
    </div>
  );
};

export default CVForm;