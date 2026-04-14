
import MainLayout from '../layout/MainLayout';
import PageHeader from '../layout/PageHeader';

const AIAssistantPage = () => {
  return (
    <MainLayout pageTitle="AI Assistant">
      <PageHeader
        title="AI Assistant"
        description="Use AI tools to improve your resume, generate cover letters, and get career guidance."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">AI Assistant content will be added here.</p>
      </div>
    </MainLayout>
  );
};

export default AIAssistantPage;