import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TopBar } from '@/components/content/topbar/TopBar';

export const Content = ({ toggleIsCollapsed, isCollapsed, children }) => (
  <div className={classNames('flex flex-col flex-1 overflow-y-auto')}>
    <TopBar toggleIsCollapsed={toggleIsCollapsed} isCollapsed={isCollapsed} />
    <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      {children}
    </main>
  </div>
);

Content.propTypes = {
  toggleSidebar: PropTypes.func,
  sidebarIsOpen: PropTypes.bool,
  children: PropTypes.node
};
