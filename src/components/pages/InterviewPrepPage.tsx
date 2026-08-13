import React, { useState } from 'react';
import PageHeader from '../layout/PageHeader';
import { interviewService, InterviewQuestion, StarAnswer, AnswerEvaluation } from '../../services/interviewService';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';
import { Sparkles, CheckCircle2, MessageSquare, Award, RefreshCw, Send } from 'lucide-react';
import EmptyState from '../ui/EmptyState';

interface MockFeedbackItem {
  question: string;
  answer: string;
  evaluation: AnswerEvaluation;
}

const InterviewPrepPage: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('questions');
  const [customResumeText, setCustomResumeText] = useState<string | null>(null);
  const [customJobDescription, setCustomJobDescription] = useState<string | null>(null);

  const resumeText = customResumeText ?? t('defaultResumeSummary', language);
  const jobDescription = customJobDescription ?? t('defaultJobDescription', language);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);
  
  // State
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [starAnswer, setStarAnswer] = useState<StarAnswer | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [evaluation, setEvaluation] = useState<AnswerEvaluation | null>(null);
  const [mockIndex, setMockIndex] = useState<number>(0);
  const [mockActive, setMockActive] = useState<boolean>(false);
  const [mockFeedbackHistory, setMockFeedbackHistory] = useState<MockFeedbackItem[]>([]);

  // Generate Questions
  const handleGenerateQuestions = async () => {
    setLoading(true);
    try {
      const qList = await interviewService.getQuestions(resumeText, jobDescription, selectedCategory, 4);
      setQuestions(qList);
      if (qList.length > 0) setSelectedQuestion(qList[0]);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  // Generate Personalized STAR Answer
  const handleGenerateSTARAnswer = async (questionObj?: InterviewQuestion) => {
    const targetQ = questionObj || selectedQuestion;
    if (!targetQ) return;
    setLoading(true);
    try {
      const star = await interviewService.getPersonalizedAnswer(resumeText, targetQ.question);
      setStarAnswer(star);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  // Evaluate User Answer
  const handleEvaluateAnswer = async () => {
    if (!selectedQuestion || !userAnswer.trim()) return;
    setLoading(true);
    try {
      const res = await interviewService.evaluateAnswer(selectedQuestion.question, userAnswer);
      setEvaluation(res);

      if (mockActive) {
        setMockFeedbackHistory((prev) => [...prev, { question: selectedQuestion.question, answer: userAnswer, evaluation: res }]);
        if (mockIndex + 1 < questions.length) {
          setMockIndex((prev) => prev + 1);
          setSelectedQuestion(questions[mockIndex + 1]);
          setUserAnswer('');
        } else {
          setMockActive(false);
        }
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  const readiness = interviewService.calculateReadinessScore(questions.length, evaluation ? evaluation.overallScore : 78, evaluation ? evaluation.improvements.length : 1);

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('interviewPrepTitle', language)}
        description={t('interviewPrepDesc', language)}
      />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-theme pb-4">
        {[
          { id: 'questions', label: t('generateQuestions', language), icon: Sparkles },
          { id: 'star', label: t('starAnswer', language), icon: CheckCircle2 },
          { id: 'evaluator', label: t('evaluateAnswer', language), icon: MessageSquare },
          { id: 'mock', label: t('mockInterview', language), icon: RefreshCw },
          { id: 'readiness', label: t('interviewReadiness', language), icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'border border-theme bg-surface text-theme-secondary hover:bg-slate-100 hover:text-theme-primary dark:hover:bg-white/10'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Context Drawer */}
      <div className="rounded-3xl border border-theme bg-surface p-6 backdrop-blur-xl">
        <h3 className="text-base font-semibold text-theme-primary mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-500" /> {t('contextHeader', language)}
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-theme-secondary mb-1">{t('resumeSummaryLabel', language)}</label>
            <textarea
              value={resumeText}
              onChange={(e) => setCustomResumeText(e.target.value)}
              rows={3}
              className="w-full rounded-2xl border border-theme bg-surface p-3 text-xs text-theme-primary outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-theme-secondary mb-1">{t('targetJobDescLabel', language)}</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setCustomJobDescription(e.target.value)}
              rows={3}
              className="w-full rounded-2xl border border-theme bg-surface p-3 text-xs text-theme-primary outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* TAB 1: QUESTIONS GENERATOR */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              {['all', 'technical', 'behavioral', 'situational', 'hr'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                    selectedCategory === cat ? 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/40' : 'border border-theme bg-surface text-theme-secondary hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  {t(cat, language)}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerateQuestions}
              disabled={loading}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" /> {loading ? t('generatingQuestions', language) : t('generateQuestions', language)}
            </button>
          </div>

          <div className="grid gap-4">
            {questions.length === 0 ? (
              <EmptyState
                title={t('generateQuestions', language)}
                description={t('questionsEmpty', language)}
              />
            ) : (
              questions.map((q) => (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuestion(q)}
                  className={`cursor-pointer rounded-3xl border p-6 transition ${
                    selectedQuestion?.id === q.id
                      ? 'border-indigo-500/60 bg-indigo-50 dark:bg-indigo-950/20'
                      : 'border-theme bg-surface hover:border-indigo-400/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex gap-2 mb-2">
                        <span className="rounded-full bg-indigo-500/10 px-3 py-0.5 text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400">{t(q.category, language) || q.category}</span>
                        <span className="rounded-full border border-theme bg-surface px-3 py-0.5 text-xs font-medium text-theme-secondary capitalize">{t(q.difficulty, language) || q.difficulty}</span>
                      </div>
                      <h4 className="text-base font-semibold text-theme-primary">{q.question}</h4>
                      <p className="mt-1 text-xs text-theme-secondary">{q.reason}</p>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleGenerateSTARAnswer(q); setActiveTab('star'); }}
                      className="rounded-2xl border border-indigo-500/40 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300 px-3 py-1.5 text-xs font-medium hover:bg-indigo-500/20"
                    >
                      {t('starAnswer', language)}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: STAR ANSWER COACH */}
      {activeTab === 'star' && (
        <div className="space-y-6">
          {selectedQuestion ? (
            <div className="rounded-3xl border border-theme bg-surface p-6 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400">{t('targetQuestionHeader', language)}</span>
                <h3 className="text-lg font-bold text-theme-primary mt-1">{selectedQuestion.question}</h3>
              </div>

              {!starAnswer ? (
                <button
                  onClick={() => handleGenerateSTARAnswer(selectedQuestion)}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4" /> {loading ? t('generatingStarAnswer', language) : t('generateStarAnswer', language)}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-theme bg-slate-50 dark:bg-slate-950/80 p-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">{t('starSituation', language)}</span>
                      <p className="mt-1 text-xs text-theme-secondary">{starAnswer.situation}</p>
                    </div>
                    <div className="rounded-2xl border border-theme bg-slate-50 dark:bg-slate-950/80 p-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">{t('starTask', language)}</span>
                      <p className="mt-1 text-xs text-theme-secondary">{starAnswer.task}</p>
                    </div>
                    <div className="rounded-2xl border border-theme bg-slate-50 dark:bg-slate-950/80 p-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{t('starAction', language)}</span>
                      <p className="mt-1 text-xs text-theme-secondary">{starAnswer.action}</p>
                    </div>
                    <div className="rounded-2xl border border-theme bg-slate-50 dark:bg-slate-950/80 p-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">{t('starResult', language)}</span>
                      <p className="mt-1 text-xs text-theme-secondary">{starAnswer.result}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-indigo-500/20 bg-indigo-50 dark:bg-indigo-950/30 p-4">
                    <span className="text-xs font-semibold uppercase text-indigo-700 dark:text-indigo-300">{t('completeAnswerScript', language)}</span>
                    <p className="mt-2 text-sm leading-relaxed text-theme-primary">{starAnswer.answerText}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState
              title={t('starAnswer', language)}
              description={t('starSelectFirst', language)}
            />
          )}
        </div>
      )}

      {/* TAB 3: ANSWER EVALUATOR */}
      {activeTab === 'evaluator' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-theme bg-surface p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400">{t('targetQuestion', language)}</label>
              <p className="mt-1 text-base font-semibold text-theme-primary">{selectedQuestion ? selectedQuestion.question : t('defaultFallbackQuestion', language)}</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-theme-secondary mb-1">{t('practiceAnswerLabel', language)}</label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={t('practiceAnswerPlaceholder', language)}
                rows={4}
                className="w-full rounded-2xl border border-theme bg-surface p-4 text-sm text-theme-primary outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleEvaluateAnswer}
              disabled={loading || !userAnswer.trim()}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> {loading ? t('evaluatingAnswer', language) : t('evaluateAnswer', language)}
            </button>
          </div>

          {evaluation && (
            <div className="rounded-3xl border border-theme bg-surface p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-theme pb-4">
                <div>
                  <h4 className="text-lg font-bold text-theme-primary">{t('evaluationReportTitle', language)}</h4>
                  <p className="text-xs text-theme-secondary">{t('coachingScoreEst', language)}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{evaluation.overallScore}/100</span>
                  <span className="block text-xs text-theme-secondary">{t('overallScoreLabel', language)}</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-theme bg-slate-50 dark:bg-slate-950 p-3 text-center">
                  <span className="text-xs text-theme-secondary block">{t('relevance', language)}</span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{evaluation.relevance}%</span>
                </div>
                <div className="rounded-2xl border border-theme bg-slate-50 dark:bg-slate-950 p-3 text-center">
                  <span className="text-xs text-theme-secondary block">{t('structure', language)}</span>
                  <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{evaluation.structure}%</span>
                </div>
                <div className="rounded-2xl border border-theme bg-slate-50 dark:bg-slate-950 p-3 text-center">
                  <span className="text-xs text-theme-secondary block">{t('jobAlignment', language)}</span>
                  <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{evaluation.jobAlignment}%</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50 dark:bg-emerald-950/20 p-4">
                  <h5 className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-2">{t('keyStrengths', language)}</h5>
                  <ul className="space-y-1 text-xs text-theme-secondary list-disc list-inside">
                    {evaluation.feedback.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
                <div className="rounded-2xl border border-amber-500/20 bg-amber-50 dark:bg-amber-950/20 p-4">
                  <h5 className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400 mb-2">{t('recommendedImprovements', language)}</h5>
                  <ul className="space-y-1 text-xs text-theme-secondary list-disc list-inside">
                    {evaluation.improvements.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: MOCK INTERVIEW MODE */}
      {activeTab === 'mock' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-theme bg-surface p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-theme-primary">{t('mockInterview', language)}</h3>
                <p className="text-xs text-theme-secondary">{t('mockInterviewDesc', language)}</p>
              </div>
              <button
                onClick={() => {
                  setMockActive(true);
                  setMockIndex(0);
                  if (questions.length > 0) setSelectedQuestion(questions[0]);
                }}
                className="rounded-2xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                {t('startMockSession', language)}
              </button>
            </div>

            {mockActive && selectedQuestion && (
              <div className="space-y-4 pt-4 border-t border-theme">
                <div className="flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                  <span>{t('questionProgress', language).replace('{index}', String(mockIndex + 1)).replace('{total}', String(questions.length || 4))}</span>
                  <span className="uppercase">{t(selectedQuestion.category, language) || selectedQuestion.category}</span>
                </div>

                <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 p-4 border border-theme">
                  <p className="text-base font-semibold text-theme-primary">{selectedQuestion.question}</p>
                </div>

                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={t('practiceAnswerPlaceholder', language)}
                  rows={4}
                  className="w-full rounded-2xl border border-theme bg-surface p-3 text-xs text-theme-primary outline-none focus:border-indigo-500"
                />

                <button
                  onClick={handleEvaluateAnswer}
                  disabled={loading || !userAnswer.trim()}
                  className="rounded-2xl bg-indigo-600 px-6 py-2 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                >
                  {t('submitAndNext', language)}
                </button>
              </div>
            )}

            {mockFeedbackHistory.length > 0 && (
              <div className="mt-6 border-t border-slate-200 pt-4 space-y-3 dark:border-white/10">
                <h4 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{t('mockCompletedTitle', language)} ({mockFeedbackHistory.length})</h4>
                {mockFeedbackHistory.map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs space-y-1 dark:border-white/5 dark:bg-slate-950">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-300">{item.question}</span>
                    <p className="text-slate-600 dark:text-slate-400">{item.answer}</p>
                    <span className="inline-block rounded bg-indigo-50 px-2 py-0.5 text-indigo-700 font-bold dark:bg-indigo-500/20 dark:text-indigo-300">{t('scoreLabel', language)}: {item.evaluation.overallScore}/100</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: READINESS DASHBOARD */}
      {activeTab === 'readiness' && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-6 text-center dark:border-indigo-500/30 dark:bg-indigo-950/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{t('interviewReadiness', language)}</span>
              <div className="mt-3 text-5xl font-extrabold text-slate-900 dark:text-white">{readiness.overallReadiness}%</div>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{t('calculatedReadiness', language)}</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3 md:col-span-2 dark:border-white/10 dark:bg-slate-900/60">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{t('scoreBreakdown', language)}</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1">
                    <span>{t('technicalScore', language)}</span>
                    <span>{readiness.technicalScore}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-2 rounded-full bg-indigo-500" style={{ width: `${readiness.technicalScore}%` }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1">
                    <span>{t('behavioralScore', language)}</span>
                    <span>{readiness.behavioralScore}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-2 rounded-full bg-emerald-500" style={{ width: `${readiness.behavioralScore}%` }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1">
                    <span>{t('targetJobAlignment', language)}</span>
                    <span>{readiness.jobAlignmentScore}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-2 rounded-full bg-amber-500" style={{ width: `${readiness.jobAlignmentScore}%` }} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPrepPage;
