import { useEffect, useState } from 'react';

import { useOutlet } from 'react-router-dom';
import { SideBar } from '@/components/content/sidebar/SideBar';
import { Content } from '@/components/content/Content';

import { useWindowWidth } from '@react-hook/window-size';

import classNames from 'classnames';

const DashboardLayout = () => {
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 1024;

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleIsCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const mobileToggleIsCollapsed = () => {
    if (mobileWidth) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const outlet = useOutlet();

  useEffect(() => {
    if (mobileWidth) {
      setIsCollapsed(true);
    }
  }, [mobileWidth, setIsCollapsed]);

  return (
    <div
      className={classNames('flex min-h-screen grid-cols-[280px_1fr]', {
        'md:grid': !isCollapsed
      })}
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
