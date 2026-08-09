import React from 'react';
import PageHeader from '../layout/PageHeader';
import ApplicationBoard from '../applications/ApplicationBoard';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

const ApplicationsPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('applications', language)}
        description={t('applicationsDesc', language)}
      />

      <ApplicationBoard />
    </div>
  );
};

export default ApplicationsPage;
