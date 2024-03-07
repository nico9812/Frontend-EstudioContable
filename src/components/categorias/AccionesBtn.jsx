import Flex from '@/components/common/Flex';
import ButtonAction from '@/components/common/ButtonAction';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const AccionesBtn = ({ sentId, location = null }) => {
  const acciones = [
    {
      icon: faEdit,
      title: 'Editar',
      ruta: `${sentId}/editar`,
      className: 'text-primary',
      state: {
        backgroundLocation: location
      }
    },
    {
      icon: faRemove,
      title: 'Remover',
      ruta: `${sentId}/borrar`,
      className: 'text-danger',
      state: {
        backgroundLocation: location
      }
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
