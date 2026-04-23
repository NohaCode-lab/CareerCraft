import React, { useMemo, useState } from 'react';
import { Bot, Sparkles, User } from 'lucide-react';
import PromptInput from './PromptInput';
import AIResponseCard from './AIResponseCard';
import { generateCV } from '../../services/aiService';

const createMessage = (role, content) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  role,
  content,
});

const starterPrompts = [
  'Improve my CV summary for a front-end developer role.',
  'Write stronger achievement-based bullet points for my experience.',
  'Help me prepare for a React interview.',
  'Suggest ways to improve ATS compatibility for my CV.',
];

const AIAssistantChat = () => {
  const [messages, setMessages] = useState([]);
  const [latestResponse, setLatestResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hasMessages = messages.length > 0;

  const introText = useMemo(
    () =>
      'Ask for CV improvements, ATS suggestions, interview preparation, career guidance, or stronger achievement-based writing.',
    []
  );

  const handlePrompt = async (prompt) => {
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
        const result = await generateCV(trimmedPrompt);

        if (typeof result === 'string') {
          aiText = result;
        } else if (result?.summary || result?.experience || result?.skills) {
          const parts = [];

          if (result.summary) {
            parts.push(`Summary\n${result.summary}`);
          }

          if (result.experience) {
            const experienceText = Array.isArray(result.experience)
              ? result.experience.join('\n')
              : result.experience;

            parts.push(`Experience\n${experienceText}`);
          }

          if (result.skills) {
            const skillsText = Array.isArray(result.skills)
              ? result.skills.join(', ')
              : result.skills;

            parts.push(`Skills\n${skillsText}`);
          }

          aiText = parts.join('\n\n').trim();
        }
      } catch {
        aiText = '';
      }

      if (!aiText) {
        aiText = `Here is a stronger career-focused response based on your request:

"${trimmedPrompt}"

• Highlight measurable achievements whenever possible.
• Use stronger action verbs and concise bullet points.
• Tailor your CV and messaging to each job description.
• Keep your strongest frontend projects visible and relevant.
• Focus on clarity, relevance, and ATS-friendly wording.`;
      }

      const assistantMessage = createMessage('assistant', aiText);

      setMessages((prev) => [...prev, assistantMessage]);
      setLatestResponse(aiText);
    } catch {
      const fallbackError =
        'Something went wrong while generating the AI response. Please try again.';

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
        className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg backdrop-blur-sm"
        aria-labelledby="ai-assistant-heading"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
            <Sparkles size={22} />
          </div>

          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              <Bot size={14} />
              AI Career Assistant
            </div>

            <h2
              id="ai-assistant-heading"
              className="text-2xl font-semibold text-white"
            >
              Smart career help in one place
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
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
                className="rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-left text-sm text-slate-300 transition duration-300 hover:border-violet-400/20 hover:bg-slate-800/80 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </section>

      <PromptInput
        onSubmit={handlePrompt}
        placeholder="Ask AI for career advice, CV tips, interview help..."
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
                    ? 'border-violet-400/15 bg-slate-900/80'
                    : 'border-white/10 bg-slate-800/60'
                }`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      isAssistant
                        ? 'bg-violet-500/15 text-violet-300'
                        : 'bg-sky-500/15 text-sky-300'
                    }`}
                  >
                    {isAssistant ? <Bot size={16} /> : <User size={16} />}
                  </div>

                  <span className="text-sm font-semibold text-white">
                    {isAssistant ? 'Career Assistant' : 'You'}
                  </span>
                </div>

                <p className="whitespace-pre-line text-sm leading-6 text-slate-300">
                  {message.content}
                </p>
              </div>
            );
          })}
        </section>
      )}

      <AIResponseCard
        title="Career Assistant"
        response={latestResponse}
        isLoading={isLoading}
        error={errorMessage}
      />
    </div>
  );
};

export default AIAssistantChat;