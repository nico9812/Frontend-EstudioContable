import Flex from '@/components/common/Flex';
import BtnAccion from '@/components/common/BtnAction';
import {
  faCalendarAlt,
  faEdit,
  faFilePdf,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const AccionesBtn = ({ editId }) => {
  const acciones = [
    {
      id: 1,
      icon: faEdit,
      title: 'Editar',
      ruta: `edit/${editId}`,
      variant: 'primary'
    },
    {
      id: 2,
      icon: faCalendarAlt,
      title: 'Ver Vencimientos',
      ruta: `vencimientos/${editId}`,
      variant: 'primary'
    },
    {
      id: 3,
      icon: faFilePdf,
      title: 'Ver Documentos',
      ruta: `documentos/${editId}`,
      variant: 'primary'
    },
    {
      id: 4,
      icon: faClipboardList,
      title: 'Ver Programas',
      ruta: `programas/${editId}`,
      variant: 'primary'
    }
  ];
  return (
    <Flex justifyContent="evenly">
      {acciones.map(({ id, icon, title, ruta, variant }) => (
        <BtnAccion
          key={id}
          variant={variant}
          title={title}
          ruta={ruta}
          icon={icon}
        />
      ))}
    </Flex>
  );
};

AccionesBtn.propTypes = {
  editId: PropTypes.number
};
