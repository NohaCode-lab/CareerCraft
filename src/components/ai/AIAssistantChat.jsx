
import React, { useState } from 'react';
import PromptInput from './PromptInput';
import AIResponseCard from './AIResponseCard';

const AIAssistantChat = () => {
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePrompt = async (prompt) => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setAiResponse('');

    try {
      // 🔥 mock AI (نستبدله لاحقًا بـ API حقيقي)
      const simulatedResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            `Here is your AI response based on your request:\n\n"${prompt}"\n\n• Improve your CV by adding measurable achievements.\n• Use strong action verbs.\n• Tailor your CV to each job description.\n• Highlight your front-end projects clearly.`
          );
        }, 1200);
      });

      setAiResponse(simulatedResponse);
    } catch (error) {
      console.error('AI error:', error);
      setAiResponse('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <PromptInput
        onSubmit={handlePrompt}
        placeholder="Ask AI for career advice, CV tips, interview help..."
      />

      {/* Response */}
      <AIResponseCard
        title="Career Assistant"
        response={aiResponse}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AIAssistantChat;