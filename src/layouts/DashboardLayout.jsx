import { useState } from 'react';

import { useOutlet } from 'react-router-dom';
import { SideBar } from '@/components/sidebar/SideBar';
import { Content } from '@/components/content/Content';

const DashboardLayout = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  const outlet = useOutlet();

  return (
    <div className="App wrapper">
      <SideBar toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
      <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen}>
        <div className="shadow-lg p-3 mb-5 bg-white rounded">{outlet}</div>
      </Content>
    </div>
  );
};

export default DashboardLayout;
