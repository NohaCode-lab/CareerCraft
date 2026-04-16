
import React, { useState } from 'react';
import AIResponseCard from './AIResponseCard';

const CoverLetterGenerator = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    companyName: '',
    experience: '',
    skills: '',
  });

  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerate = async () => {
    const { fullName, jobTitle, companyName, experience, skills } = formData;

    if (
      !fullName.trim() ||
      !jobTitle.trim() ||
      !companyName.trim() ||
      !experience.trim() ||
      !skills.trim()
    ) {
      return;
    }

    setIsLoading(true);
    setGeneratedLetter('');

    try {
      const letter = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(`Dear Hiring Manager,

I am writing to express my interest in the ${jobTitle} position at ${companyName}. My name is ${fullName}, and I am excited about the opportunity to contribute my experience and skills to your team.

With a background in ${experience}, I have developed strong capabilities that align well with the requirements of this role. My key skills include ${skills}, which I believe would allow me to add value and make a positive impact at ${companyName}.

I am highly motivated, eager to grow, and committed to delivering high-quality work. I would welcome the opportunity to discuss how my background and strengths can support your team’s goals.

Thank you for your time and consideration.

Sincerely,
${fullName}`);
        }, 1200);
      });

      setGeneratedLetter(letter);
    } catch (error) {
      console.error('Failed to generate cover letter:', error);
      setGeneratedLetter('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card-base p-6">
        <div className="mb-6">
          <h2 className="section-title">Cover Letter Generator</h2>
          <p className="section-subtitle mt-1">
            Generate a tailored cover letter for your next application.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="rounded-lg border border-slate-300 p-3 text-sm focus:border-indigo-500 focus:outline-none"
          />

          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Job Title"
            className="rounded-lg border border-slate-300 p-3 text-sm focus:border-indigo-500 focus:outline-none"
          />

          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="rounded-lg border border-slate-300 p-3 text-sm focus:border-indigo-500 focus:outline-none md:col-span-2"
          />

          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Briefly describe your experience"
            rows={4}
            className="rounded-lg border border-slate-300 p-3 text-sm focus:border-indigo-500 focus:outline-none md:col-span-2"
          />

          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Key skills"
            rows={4}
            className="rounded-lg border border-slate-300 p-3 text-sm focus:border-indigo-500 focus:outline-none md:col-span-2"
          />
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Generating...' : 'Generate Cover Letter'}
        </button>
      </div>

      <AIResponseCard
        title="Generated Cover Letter"
        response={generatedLetter}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CoverLetterGenerator;