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
  FaClipboardList
} from 'react-icons/fa';
import ButtonAction from '../common/ButtonAction';
import { Button } from '../ui/button';
import { BsThreeDots } from 'react-icons/bs';

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
          <DropdownMenuItem key={i}>
            <ButtonAction
              className="gap-2"
              title={title}
              ruta={ruta}
              icon={icon}
              {...(state && { state })}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
