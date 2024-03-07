import { selectCurrentUserName } from '@/redux/reducer/authReducerSlice';
import { useSelector } from 'react-redux';

import { faAlignLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

export const TopBar = ({ toggleIsCollapsed }) => {
  const username = useSelector(selectCurrentUserName);

  return (
    <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 md:px-5 bg-gray-100/40">
      <div className="flex items-center px-4">
        <Button color="info" onClick={toggleIsCollapsed}>
          <FontAwesomeIcon
            icon={faAlignLeft}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 h-5 w-5"
          />
        </Button>
      </div>
      <div className="flex items-center pr-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FontAwesomeIcon
              icon={faUser}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 h-5 w-5"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              Usuario: {username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                to="/logout"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
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
