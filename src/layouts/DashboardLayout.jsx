import { useState } from 'react';

import { useOutlet } from 'react-router-dom';
import { SideBar } from '@/components/sidebar/SideBar';
import { Content } from '@/components/content/Content';

import { useWindowWidth } from '@react-hook/window-size';

import classNames from 'classnames';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const toggleIsCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const mobileToggleIsCollapsed = () => {
    if (mobileWidth) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const outlet = useOutlet();

  return (
    <div
      className={classNames('flex min-h-screen grid-cols-[280px_1fr]', {
        'md:grid': !isCollapsed
      })}
      style={{
        zoom: '130%'
      }}
    >
      <SideBar
        mobileToggleIsCollapsed={mobileToggleIsCollapsed}
        toggleIsCollapsed={toggleIsCollapsed}
        isCollapsed={isCollapsed}
      />
      <Content toggleIsCollapsed={toggleIsCollapsed} isCollapsed={isCollapsed}>
        {outlet}
      </Content>
    </div>
  );
};

export default DashboardLayout;
