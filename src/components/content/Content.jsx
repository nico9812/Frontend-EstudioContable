import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Container } from 'reactstrap';

import { TopBar } from '@/components/content/topbar/TopBar';
import '@/components/content/content.scss';

export const Content = ({ toggleSidebar, sidebarIsOpen, children }) => (
  <Container
    fluid
    className={classNames('content', { 'is-open': sidebarIsOpen })}
  >
    <TopBar toggleSidebar={toggleSidebar} />
    {children}
  </Container>
);

Content.propTypes = {
  toggleSidebar: PropTypes.func,
  sidebarIsOpen: PropTypes.bool,
  children: PropTypes.node
};
