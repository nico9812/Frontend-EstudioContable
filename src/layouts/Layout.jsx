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
        <div className="px-4">
          <Outlet />
        </div>
      </Content>
    </div>
  );
};

export default Layout;
