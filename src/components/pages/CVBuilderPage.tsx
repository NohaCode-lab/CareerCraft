import React from 'react';
import PageHeader from '../layout/PageHeader';
import CVForm from '../cv/CVForm';
import CVPreview from '../cv/CVPreview';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

const CVBuilderPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('cvBuilder', language)}
        description={t('cvBuilderDesc', language)}
      />

      <div className="grid gap-8 xl:grid-cols-12">
        <section className="space-y-6 xl:col-span-6" aria-label="CV form builder">
          <CVForm />
        </section>

        <section className="space-y-6 xl:col-span-6" aria-label="Live CV preview">
          <CVPreview />
        </section>
      </div>
    </div>
  );
};

export default CVBuilderPage;
