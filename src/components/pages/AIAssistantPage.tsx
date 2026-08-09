import React from 'react';
import PageHeader from '../layout/PageHeader';
import AIAssistantChat from '../ai/AIAssistantChat';
import CoverLetterGenerator from '../ai/CoverLetterGenerator';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

const AIAssistantPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('aiAssistant', language)}
        description={t('aiAssistantDesc', language)}
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
