import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavLink, Nav } from 'reactstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '@/components/sidebar/sidebar.scss';
import 'simplebar-react/dist/simplebar.min.css';
import { useSelector } from 'react-redux';
import { selectCurrentGroup } from '@/redux/reducer/authReducerSlice';

export const SideBar = ({ toggleSidebar, sidebarIsOpen }) => {
  const group = useSelector(selectCurrentGroup);

  const NavGrouper = () => {
    if (group === 1) {
      return (
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
      );
    }

    if (group === 2) {
      return (
        <NavItem>
          <NavLink tag={Link} to={'/dashboard/cliente/vencimientos'}>
            <FontAwesomeIcon icon={faUser} className="mx-2" />
            Mis vencimientos
          </NavLink>
          <NavLink tag={Link} to={'/dashboard/cliente/programas'}>
            <FontAwesomeIcon icon={faUser} className="mx-2" />
            Mis Programas
          </NavLink>
          <NavLink tag={Link} to={'/dashboard/cliente/documentos'}>
            <FontAwesomeIcon icon={faUser} className="mx-2" />
            Mis Documentos
          </NavLink>
        </NavItem>
      );
    }
  };

  return (
    <div className={classNames('sidebar', { 'is-open': sidebarIsOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggleSidebar} style={{ color: '#fff' }}>
          &times;
        </span>
        <h3>Sistema de Documentos</h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <NavGrouper />
        </Nav>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  toggleSidebar: PropTypes.func,
  sidebarIsOpen: PropTypes.bool
};
