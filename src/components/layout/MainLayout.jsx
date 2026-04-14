
import { useState } from 'react';
import MobileSidebar from './MobileSidebar';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children, pageTitle = 'Dashboard' }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={closeMobileSidebar}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar
            title={pageTitle}
            onMenuClick={openMobileSidebar}
          />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;