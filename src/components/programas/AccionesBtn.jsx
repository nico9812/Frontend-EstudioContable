import PropTypes from 'prop-types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { BsThreeDots } from 'react-icons/bs';
import ButtonAction from '../common/ButtonAction';
import { Link } from 'react-router-dom';
import { FaEdit, FaRemoveFormat } from 'react-icons/fa';

export const AccionesBtn = ({ sentId, location = null }) => {
  const acciones = [
    {
      icon: FaEdit,
      title: 'Editar',
      ruta: `editar/${sentId}`,
      state: {
        backgroundLocation: location
      }
    },
    {
      icon: FaRemoveFormat,
      title: 'Remover',
      ruta: `borrar/${sentId}`,
      state: {
        backgroundLocation: location
      }
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BsThreeDots className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {acciones.map(({ icon, title, ruta, className, state }, i) => (
          <Link to={ruta} state={state} key={i}>
            <DropdownMenuItem>
              <ButtonAction
                className={className + ' block w-full gap-2 justify-start'}
                title={title}
                icon={icon}
                variant="ghost"
              />
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

AccionesBtn.propTypes = {
  sentId: PropTypes.number,
  location: PropTypes.object
};
