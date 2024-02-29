import Flex from '@/components/common/Flex';
import IconAction from '@/components/common/IconAction';
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
      className: 'text-primary',
      state: {
        backgroundLocation: location
      }
    },
    {
      icon: faCalendarAlt,
      title: 'Ver Vencimientos',
      ruta: `vencimientos/${sentId}`,
      className: 'text-primary'
    },
    {
      icon: faFilePdf,
      title: 'Ver Documentos',
      ruta: `documentos/${sentId}`,
      className: 'text-primary'
    },
    {
      icon: faClipboardList,
      title: 'Ver Programas',
      ruta: `programas/${sentId}`,
      className: 'text-primary'
    }
  ];
  return (
    <Flex justifyContent="evenly" className="gap-3 gap-lg-0">
      {acciones.map(({ icon, title, ruta, className, state }, i) => (
        <IconAction
          key={i}
          className={className}
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
