
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';

const tips = [
  'Practice concise self-introductions.',
  'Prepare STAR format examples for projects and achievements.',
  'Review frontend fundamentals, React, and problem-solving.',
];

const DashboardInterviewPrepPreview = () => {
  const navigate = useNavigate();

  return (
    <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Interview Prep</h2>
        <p className="mt-1 text-sm text-slate-400">
          Stay ready for technical and behavioral interviews.
        </p>
      </div>

      <div className="space-y-3">
        {tips.map((tip) => (
          <div
            key={tip}
            className="rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-sm text-slate-300"
          >
            {tip}
          </div>
        ))}
      </div>

      <Button className="mt-6 w-full" onClick={() => navigate('/interview-prep')}>
        Start Practice
      </Button>
    </Card>
  );
};

export default DashboardInterviewPrepPreview;