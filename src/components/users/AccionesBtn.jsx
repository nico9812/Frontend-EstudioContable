import Flex from '@/components/common/Flex';
import BtnAccion from '@/components/common/BtnAction';
import {
  faCalendarAlt,
  faEdit,
  faFilePdf,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const AccionesBtn = ({ sentId, location = null }) => {
  const acciones = [
    {
      icon: faEdit,
      title: 'Editar',
      ruta: `clientes/editar/${sentId}`,
      variant: 'primary',
      state: {
        backgroundLocation: location
      }
    },
    {
      icon: faCalendarAlt,
      title: 'Ver Vencimientos',
      ruta: `vencimientos/${sentId}`,
      variant: 'primary'
    },
    {
      icon: faFilePdf,
      title: 'Ver Documentos',
      ruta: `documentos/${sentId}`,
      variant: 'primary'
    },
    {
      icon: faClipboardList,
      title: 'Ver Programas',
      ruta: `programas/${sentId}`,
      variant: 'primary'
    }
  ];
  return (
    <Flex justifyContent="evenly" className="gap-3 gap-lg-0">
      {acciones.map(({ icon, title, ruta, variant, state }, i) => (
        <BtnAccion
          key={i}
          variant={variant}
          title={title}
          ruta={ruta}
          icon={icon}
          {...(state && { state })}
        />
      ))}
    </Flex>
  );
};

AccionesBtn.propTypes = {
  sentId: PropTypes.number,
  location: PropTypes.object
};
