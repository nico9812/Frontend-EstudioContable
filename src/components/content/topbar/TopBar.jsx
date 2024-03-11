import { selectCurrentUserName } from '@/redux/reducer/authReducerSlice';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { FaAlignLeft, FaUser } from 'react-icons/fa';

export const TopBar = ({ toggleIsCollapsed }) => {
  const username = useSelector(selectCurrentUserName);

  return (
    <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 md:px-5 bg-gray-100/40">
      <div className="flex items-center px-4">
        <div onClick={toggleIsCollapsed}>
          <FaAlignLeft className="flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 h-5 w-5 cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center pr-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaUser className="flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 h-5 w-5 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              Usuario: {username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                to="/logout"
                className="flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Cerrar sesión
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

TopBar.propTypes = {
  toggleSidebar: PropTypes.func
};
