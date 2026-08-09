import React, { useMemo, useState } from 'react';
import { Bot, Sparkles, User } from 'lucide-react';
import PromptInput from './PromptInput';
import AIResponseCard from './AIResponseCard';
import { generateCV } from '../../services/aiService';
import useLanguage from '../../hooks/useLanguage';
import { translations } from '../../config/translations';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const createMessage = (role: 'user' | 'assistant', content: string): Message => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  role,
  content,
});

const AIAssistantChat: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const [messages, setMessages] = useState<Message[]>([]);
  const [latestResponse, setLatestResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hasMessages = messages.length > 0;

  const starterPrompts = useMemo(() => {
    if (language === 'de') {
      return [
        'Verbessere meine Zusammenfassung für den Lebenslauf.',
        'Schreibe stärkere erfolgsbasierte Stichpunkte für meine Erfahrung.',
        'Hilf mir bei der Vorbereitung auf ein React-Interview.',
        'Gib mir Tipps zur Verbesserung der ATS-Kompatibilität.',
      ];
    }
    if (language === 'ar') {
      return [
        'حسّن ملخص سيرتي الذاتية لوظيفة مطور بواجهات الأمامية.',
        'اكتب نقاط إنجازات أقوى لخبرتي العملية.',
        'ساعدني في التحضير لمقابلة عمل في تقنيات React.',
        'اقترح طرقاً لتحسين توافق سيرتي الذاتية مع نظام ATS.',
      ];
    }
    return [
      'Improve my CV summary for a front-end developer role.',
      'Write stronger achievement-based bullet points for my experience.',
      'Help me prepare for a React interview.',
      'Suggest ways to improve ATS compatibility for my CV.',
    ];
  }, [language]);

  const introText = useMemo(() => {
    if (language === 'de') {
      return 'Fragen Sie nach Verbesserungsvorschlägen für Ihren Lebenslauf, ATS-Tipps oder Interviewvorbereitung.';
    }
    if (language === 'ar') {
      return 'اطلب تحسينات السيرة الذاتية، مقترحات أنظمة ATS، أو التدريب على المقابلات والارتقاء بملفك المهني.';
    }
    return 'Ask for CV improvements, ATS suggestions, interview preparation, career guidance, or stronger achievement-based writing.';
  }, [language]);

  const handlePrompt = async (prompt: string) => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || isLoading) return;

    const userMessage = createMessage('user', trimmedPrompt);

    setIsLoading(true);
    setErrorMessage('');
    setLatestResponse('');
    setMessages((prev) => [...prev, userMessage]);

    try {
      let aiText = '';

      try {
        const result: any = await generateCV(trimmedPrompt);

        if (typeof result === 'string') {
          aiText = result;
        } else if (result?.summary || result?.experience || result?.skills) {
          const parts = [];

          if (result.summary) {
            parts.push(`${language === 'ar' ? 'الملخص' : language === 'de' ? 'Zusammenfassung' : 'Summary'}\n${result.summary}`);
          }

          if (result.experience) {
            const experienceText = Array.isArray(result.experience)
              ? result.experience.join('\n')
              : result.experience;

            parts.push(`${language === 'ar' ? 'الخبرة' : language === 'de' ? 'Erfahrung' : 'Experience'}\n${experienceText}`);
          }

          if (result.skills) {
            const skillsText = Array.isArray(result.skills)
              ? result.skills.join(', ')
              : result.skills;

            parts.push(`${language === 'ar' ? 'المهارات' : language === 'de' ? 'Kenntnisse' : 'Skills'}\n${skillsText}`);
          }

          aiText = parts.join('\n\n').trim();
        }
      } catch {
        aiText = '';
      }

      if (!aiText) {
        if (language === 'ar') {
          aiText = `إليك استجابة مهنية مخصصة لبحثك:

"${trimmedPrompt}"

• ركز على إبراز الإنجازات القابلة للقياس بالأرقام.
• استخدم أفعالاً قوية ومؤثرة في نقاط السيرة الذاتية.
• طابق سيرتك الذاتية ورسائلك مع متطلبات كل وظيفة.
• حافظ على توافق كلمتك المفتاحية مع معايير أنظمة ATS.`;
        } else if (language === 'de') {
          aiText = `Hier ist eine strukturierte Antwort auf Ihre Anfrage:

"${trimmedPrompt}"

• Heben Sie messbare Erfolge mit Zahlen hervor.
• Verwenden Sie starke Aktionsverben.
• Passen Sie Ihren Lebenslauf an die Stellenbeschreibung an.
• Achten Sie auf ATS-freundliche Formulierungen.`;
        } else {
          aiText = `Here is a stronger career-focused response based on your request:

"${trimmedPrompt}"

• Highlight measurable achievements whenever possible.
• Use stronger action verbs and concise bullet points.
• Tailor your CV and messaging to each job description.
• Focus on clarity, relevance, and ATS-friendly wording.`;
        }
      }

      const assistantMessage = createMessage('assistant', aiText);

      setMessages((prev) => [...prev, assistantMessage]);
      setLatestResponse(aiText);
    } catch {
      const fallbackError =
        language === 'ar'
          ? 'حدث خطأ أثناء توليد رد الذكاء الاصطناعي. بياناتك محفوظة، يرجى المحاولة مرة أخرى.'
          : language === 'de'
          ? 'Fehler beim Generieren der KI-Antwort. Ihre Daten sind sicher. Bitte versuchen Sie es erneut.'
          : 'Something went wrong while generating the AI response. Your input is safe. Please try again.';

      setErrorMessage(fallbackError);
      setLatestResponse(fallbackError);

      setMessages((prev) => [
        ...prev,
        createMessage('assistant', fallbackError),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-lg dark:backdrop-blur-sm"
        aria-labelledby="ai-assistant-heading"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-600 dark:text-violet-300">
            <Sparkles size={22} />
          </div>

          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-300">
              <Bot size={14} />
              {t.aiCareerAssistant}
            </div>

            <h2
              id="ai-assistant-heading"
              className="text-2xl font-semibold text-slate-900 dark:text-white"
            >
              {t.aiAssistant}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              {introText}
            </p>
          </div>
        </div>

        {!hasMessages && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {starterPrompts.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handlePrompt(item)}
                disabled={isLoading}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-sm text-slate-700 transition duration-300 hover:border-violet-400/40 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-violet-400/20 dark:hover:bg-slate-800/80 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </section>

      <PromptInput
        onSubmit={handlePrompt}
        placeholder={language === 'ar' ? 'اسأل الذكاء الاصطناعي عن النصائح السيرة الذاتية والمقابلات...' : language === 'de' ? 'Fragen Sie nach Lebenslauf-Tipps, Vorstellungsgesprächen...' : 'Ask AI for career advice, CV tips, interview help...'}
        disabled={isLoading}
      />

      {hasMessages && (
        <section
          className="space-y-4"
          aria-label="AI conversation history"
        >
          {messages.map((message) => {
            const isAssistant = message.role === 'assistant';

            return (
              <div
                key={message.id}
                className={`rounded-3xl border p-4 shadow-sm backdrop-blur-sm ${
                  isAssistant
                    ? 'border-violet-200 bg-violet-50/50 dark:border-violet-400/15 dark:bg-slate-900/80'
                    : 'border-slate-200 bg-white dark:border-white/10 dark:bg-slate-800/60'
                }`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      isAssistant
                        ? 'bg-violet-500/15 text-violet-600 dark:text-violet-300'
                        : 'bg-sky-500/15 text-sky-600 dark:text-sky-300'
                    }`}
                  >
                    {isAssistant ? <Bot size={16} /> : <User size={16} />}
                  </div>

                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {isAssistant ? t.aiCareerAssistant : (language === 'ar' ? 'أنت' : language === 'de' ? 'Sie' : 'You')}
                  </span>
                </div>

                <p className="whitespace-pre-line text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {message.content}
                </p>
              </div>
            );
          })}
        </section>
      )}

      <AIResponseCard
        title={t.aiCareerAssistant}
        response={latestResponse}
        isLoading={isLoading}
        error={errorMessage}
      />
    </div>
  );
};

export default AIAssistantChat;
