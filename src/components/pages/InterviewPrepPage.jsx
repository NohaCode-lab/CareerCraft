import React from 'react';
import InterviewChecklist from '../interview/InterviewChecklist';
import STARBuilder from '../interview/STARBuilder';
import QuestionCategory from '../interview/QuestionCategory';
import QuestionCard from '../interview/QuestionCard';
import PageHeader from '../layout/PageHeader';

const questionCategories = [
  {
    id: 'behavioral',
    title: 'Behavioral Questions',
    description:
      'Practice answering questions about your past experiences, teamwork, and problem solving.',
    count: 6,
    type: 'behavioral',
    isActive: true,
  },
  {
    id: 'technical',
    title: 'Technical Questions',
    description:
      'Prepare for technical concepts, tools, workflows, and role-specific knowledge.',
    count: 4,
    type: 'technical',
    isActive: false,
  },
  {
    id: 'hr',
    title: 'HR Questions',
    description:
      'Get ready for common HR questions about motivation, strengths, and career goals.',
    count: 5,
    type: 'hr',
    isActive: false,
  },
];

const sampleQuestions = [
  {
    id: 1,
    question: 'Tell me about a time you solved a difficult problem.',
    category: 'Behavioral',
    difficulty: 'Medium',
    tip: 'Use the STAR method and focus on your actions and measurable results.',
    sampleAnswer:
      'In my previous project, we had a deadline issue because part of the UI was not responsive across devices...',
  },
  {
    id: 2,
    question: 'Why do you want to work for this company?',
    category: 'HR',
    difficulty: 'Easy',
    tip: 'Connect your skills and goals with the company mission.',
    sampleAnswer:
      'I want to work for this company because I value building user-focused digital products...',
  },
  {
    id: 3,
    question: 'How do you handle tight deadlines?',
    category: 'Behavioral',
    difficulty: 'Medium',
    tip: 'Show that you stay calm, prioritize tasks, and communicate clearly.',
    sampleAnswer:
      'When I work under pressure, I first break the work into clear priorities...',
  },
];

const InterviewPrepPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Interview Prep"
        description="Practice common interview questions, build strong STAR answers, and improve your interview readiness."
      />

      {/* Tools */}
      <section
        className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"
        aria-label="Interview preparation tools"
      >
        <InterviewChecklist />
        <div className="xl:sticky xl:top-24">
          <STARBuilder />
        </div>
      </section>

      {/* Categories */}
      <section
        className="space-y-5"
        aria-labelledby="question-categories-heading"
      >
        <div>
          <h2
            id="question-categories-heading"
            className="text-2xl font-bold text-white"
          >
            Question Categories
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Explore the main interview areas you should prepare for.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {questionCategories.map((category) => (
            <QuestionCategory
              key={category.id}
              {...category}
            />
          ))}
        </div>
      </section>

      {/* Questions */}
      <section
        className="space-y-5"
        aria-labelledby="practice-questions-heading"
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id="practice-questions-heading"
              className="text-2xl font-bold text-white"
            >
              Practice Questions
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Review sample questions and train yourself to answer clearly and confidently.
            </p>
          </div>

          {/* Count */}
          <span className="text-sm text-slate-400">
            {sampleQuestions.length} questions
          </span>
        </div>

        <div className="grid gap-6">
          {sampleQuestions.map((item) => (
            <QuestionCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default InterviewPrepPage;