import PageHeader from '../layout/PageHeader';
import AIAssistantChat from '../ai/AIAssistantChat';
import CoverLetterGenerator from '../ai/CoverLetterGenerator';

const AIAssistantPage = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Assistant"
        description="Use AI tools to improve your CV, generate cover letters, and get personalized career guidance."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="space-y-4" aria-label="AI career chat">
          <AIAssistantChat />
        </section>

        <section className="space-y-4" aria-label="Cover letter generator">
          <CoverLetterGenerator />
        </section>
      </div>
    </div>
  );
};

export default AIAssistantPage;