import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';
import { useOpenDocumentoMutation } from '@/redux/api/documentosApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';

// contador
export function CardDoc({ documento }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [openDocumento] = useOpenDocumentoMutation();

  const handleAbrirDoc = async () => {
    try {
      await openDocumento(documento.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBorrarDoc = event => {
    event.preventDefault();
    return navigate(
      `/dashboard/contador/documentos/${documento.propietario}/borrar/${documento.id}`,
      {
        state: {
          backgroundLocation: location
        }
      }
    );
  };

  return (
    <Card
      className="p-2 h-100 flex-center"
      onClick={() => handleAbrirDoc()}
      onContextMenu={event => handleBorrarDoc(event)}
    >
      <FontAwesomeIcon icon={faFilePdf} className="pdf-icon" />
      <strong>{documento.nombre}</strong>
      <span>
        {new Date(documento.fecha_creacion).toLocaleDateString('es-AR', {
          timeZone: 'UTC',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </span>
    </Card>
  );
}

CardDoc.propTypes = {
  documento: PropTypes.shape({
    id: PropTypes.any,
    nombre: PropTypes.any,
    propietario: PropTypes.any,
    fecha_creacion: PropTypes.any
  })
};
