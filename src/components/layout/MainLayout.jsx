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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />

        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={closeMobileSidebar}
        />

        <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
          <Navbar title={pageTitle} onMenuClick={openMobileSidebar} />

          <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_30%)] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;