import { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import PageHeader from '../layout/PageHeader';

import ApplicationBoard from '../applications/ApplicationBoard';
import ApplicationDetailsModal from '../applications/ApplicationDetailsModal';

import useApplications from '../../hooks/useApplications';

const ApplicationsPage = () => {
  const { applications } = useApplications();

  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleCardClick = (application) => {
    setSelectedApplication(application);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
  };

  return (
    <MainLayout pageTitle="Applications">
      <PageHeader
        title="Applications"
        description="Organize your job applications, track statuses, and manage follow-ups efficiently."
      />

      {/* Board */}
      <div className="mt-6">
        <ApplicationBoard
          applications={applications}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Modal */}
      <ApplicationDetailsModal
        isOpen={Boolean(selectedApplication)}
        application={selectedApplication}
        onClose={handleCloseModal}
      />
    </MainLayout>
  );
};

export default ApplicationsPage;