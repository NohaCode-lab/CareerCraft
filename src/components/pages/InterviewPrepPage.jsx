import React from 'react';
import InterviewChecklist from '../interview/InterviewChecklist';
import STARBuilder from '../interview/STARBuilder';
import QuestionCategory from '../interview/QuestionCategory';
import QuestionCard from '../interview/QuestionCard';
import MainLayout from '../layout/MainLayout';
import PageHeader from '../layout/PageHeader';

const questionCategories = [
  {
    id: 'behavioral',
    title: 'Behavioral Questions',
    description: 'Practice answering questions about your past experiences, teamwork, and problem solving.',
    count: 6,
    type: 'behavioral',
    isActive: true,
  },
  {
    id: 'technical',
    title: 'Technical Questions',
    description: 'Prepare for technical concepts, tools, workflows, and role-specific knowledge.',
    count: 4,
    type: 'technical',
    isActive: false,
  },
  {
    id: 'hr',
    title: 'HR Questions',
    description: 'Get ready for common HR questions about motivation, strengths, and career goals.',
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
      'In my previous project, we had a deadline issue because part of the UI was not responsive across devices. I reviewed the layout structure, identified the styling conflicts, rebuilt the section using a mobile-first approach, and tested it on multiple breakpoints. As a result, the issue was resolved before delivery and the final user experience improved significantly.',
  },
  {
    id: 2,
    question: 'Why do you want to work for this company?',
    category: 'HR',
    difficulty: 'Easy',
    tip: 'Connect your skills and goals with the company mission, product, or culture.',
    sampleAnswer:
      'I want to work for this company because I value building user-focused digital products, and I appreciate how your team combines innovation with practical impact. I believe my front-end development skills and focus on clean UI can contribute meaningfully to your product goals.',
  },
  {
    id: 3,
    question: 'How do you handle tight deadlines?',
    category: 'Behavioral',
    difficulty: 'Medium',
    tip: 'Show that you stay calm, prioritize tasks, and communicate clearly.',
    sampleAnswer:
      'When I work under pressure, I first break the work into clear priorities, focus on the highest-impact tasks, and communicate progress early. This helps me stay organized, reduce stress, and deliver quality work on time.',
  },
];

const InterviewPrepPage = () => {
  return (
    <MainLayout pageTitle="Interview Prep">
      <PageHeader
        title="Interview Prep"
        description="Practice common interview questions, build strong STAR answers, and improve your interview readiness."
      />

      <div className="space-y-8">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <InterviewChecklist />
          <STARBuilder />
        </div>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Question Categories</h2>
            <p className="mt-2 text-sm text-slate-600">
              Explore the main interview areas you should prepare for.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {questionCategories.map((category) => (
              <QuestionCategory
                key={category.id}
                title={category.title}
                description={category.description}
                count={category.count}
                type={category.type}
                isActive={category.isActive}
              />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Practice Questions</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review sample questions and train yourself to answer clearly and confidently.
            </p>
          </div>

          <div className="grid gap-6">
            {sampleQuestions.map((item) => (
              <QuestionCard
                key={item.id}
                question={item.question}
                category={item.category}
                difficulty={item.difficulty}
                tip={item.tip}
                sampleAnswer={item.sampleAnswer}
              />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default InterviewPrepPage;