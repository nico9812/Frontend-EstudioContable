import classNames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import 'simplebar-react/dist/simplebar.min.css';
import { useSelector } from 'react-redux';
import { selectCurrentGroup } from '@/redux/reducer/authReducerSlice';
import { Calendar, FileArchive, Sheet, User, X } from 'lucide-react';

export const SideBar = ({
  mobileToggleIsCollapsed,
  toggleIsCollapsed,
  isCollapsed
}) => {
  const group = useSelector(selectCurrentGroup);

  const NavGrouper = () => {
    if (group === 1) {
      return (
        <>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            to={'/dashboard/contador'}
            onClick={mobileToggleIsCollapsed}
          >
            <User className="h-5 w-5 mr-2" />
            Clientes
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            to={'/dashboard/contador/categorias'}
            onClick={mobileToggleIsCollapsed}
          >
            <Sheet className="h-5 w-5 mr-2" />
            Categorias
          </Link>
        </>
      );
    }

    if (group === 2) {
      return (
        <>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            to={'/dashboard/cliente/vencimientos'}
            onClick={mobileToggleIsCollapsed}
          >
            <User className="h-5 w-5 mr-2" />
            Mis vencimientos
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            to={'/dashboard/cliente/programas'}
            onClick={mobileToggleIsCollapsed}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Mis Programas
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            to={'/dashboard/cliente/documentos'}
            onClick={mobileToggleIsCollapsed}
          >
            <FileArchive className="h-5 w-5 mr-2" />
            Mis Documentos
          </Link>
        </>
      );
    }
  };

  return (
    <div
      className={classNames('flex-col w-full border-r-2 bg-gray-100/40', {
        hidden: isCollapsed
      })}
    >
      <div className="flex items-center p-4 h-16 md:justify-around justify-between border-b">
        <Link to="/">
          <h3 className="font-semibold">Sistema de Documentos</h3>
        </Link>
        <X
          onClick={() => {
            toggleIsCollapsed();
          }}
          className="block md:hidden h-6 w-6 cursor-pointer"
        />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4">
          <NavGrouper />
        </nav>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  toggleIsCollapsed: PropTypes.func,
  isCollapsed: PropTypes.bool
};
