
import React, { useState } from 'react';
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

const ATSAnalyzer = () => {
  const [cvData] = useLocalStorage('cvData', defaultCV);
  const [jobDescription, setJobDescription] = useState('');
  const [score, setScore] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);

  const analyzeCV = () => {
    if (!jobDescription.trim()) return;

    const cvText = `
      ${cvData.fullName}
      ${cvData.title}
      ${cvData.summary}
      ${cvData.skills}
    `.toLowerCase();

    const jobWords = jobDescription
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.replace(/[^a-z]/g, ''))
      .filter((word) => word.length > 2);

    const uniqueWords = [...new Set(jobWords)];

    const matched = uniqueWords.filter((word) =>
      cvText.includes(word)
    );

    const calculatedScore = Math.round(
      (matched.length / uniqueWords.length) * 100
    );

    setScore(calculatedScore);
    setMatchedKeywords(matched);
  };

  return (
    <div className="card-base p-6">
      <h2 className="section-title mb-4">ATS Analyzer</h2>

      {/* Job Description Input */}
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description here..."
        rows={5}
        className="w-full rounded-lg border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
      />

      {/* Analyze Button */}
      <button
        onClick={analyzeCV}
        className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 transition"
      >
        Analyze CV
      </button>

      {/* Results */}
      {score !== null && (
        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm text-slate-500">ATS Score</p>
            <p className="text-2xl font-bold text-indigo-600">{score}%</p>
          </div>

          <div>
            <p className="text-sm text-slate-500 mb-2">Matched Keywords</p>

            {matchedKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matchedKeywords.map((word) => (
                  <span
                    key={word}
                    className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                  >
                    {word}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No keywords matched.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSAnalyzer;