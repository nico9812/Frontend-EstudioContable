import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  FaCalendarAlt,
  FaEdit,
  FaFilePdf,
  FaClipboardList,
  FaTrash
} from 'react-icons/fa';
import ButtonAction from '../common/ButtonAction';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export const DropDownActionsMenu = ({ sentId, location = null }) => {
  const acciones = [
    {
      icon: <FaEdit />,
      title: 'Editar',
      ruta: `clientes/editar/${sentId}`,
      state: {
        backgroundLocation: location
      }
    },
    {
      icon: <FaTrash />,
      title: 'Eliminar',
      ruta: `clientes/borrar/${sentId}`,
      state: {
        backgroundLocation: location
      }
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Ver Vencimientos',
      ruta: `vencimientos/${sentId}`
    },
    {
      icon: <FaFilePdf />,
      title: 'Ver Documentos',
      ruta: `documentos/${sentId}`
    },
    {
      icon: <FaClipboardList />,
      title: 'Ver Programas',
      ruta: `programas/${sentId}`
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
