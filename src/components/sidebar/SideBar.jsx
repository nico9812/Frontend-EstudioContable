import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavLink, Nav } from 'reactstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '@/components/sidebar/sidebar.scss';
import 'simplebar-react/dist/simplebar.min.css';

// const submenus = [
//   [
//     {
//       title: 'Home 1',
//       target: 'Home-1'
//     }
//   ]
// ];

export const SideBar = ({ toggleSidebar, sidebarIsOpen }) => (
  <div className={classNames('sidebar', { 'is-open': sidebarIsOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggleSidebar} style={{ color: '#fff' }}>
        &times;
      </span>
      <h3>Sistema de Documentos</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <NavItem>
          <NavLink tag={Link} to={'/dashboard/contador'}>
            <FontAwesomeIcon icon={faUser} className="mx-2" />
            Clientes
          </NavLink>
          <NavLink tag={Link} to={'/dashboard/contador/categorias'}>
            <FontAwesomeIcon icon={faUser} className="mx-2" />
            Categorias
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

SideBar.propTypes = {
  toggleSidebar: PropTypes.func,
  sidebarIsOpen: PropTypes.bool
};
