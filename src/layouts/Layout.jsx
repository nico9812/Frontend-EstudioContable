import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import { SideBar } from '@/components/sidebar/SideBar';
import { Content } from '@/components/content/Content';

const Layout = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <div className="App wrapper">
      <SideBar toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
      <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen}>
        <div className="shadow-lg p-3 mb-5 bg-white rounded">
          <Outlet />
        </div>
      </Content>
    </div>
  );
};

export default Layout;
