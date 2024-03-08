import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { useOpenDocumentoMutation } from '@/redux/api/documentosApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../ui/card';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '../ui/context-menu';
import { FaFilePdf, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

// contador
export function CardDoc({ documento }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [openDocumento] = useOpenDocumentoMutation();

  const handleAbrirDoc = async () => {
    try {
      await openDocumento(documento.id);
    } catch (error) {
      toast.error('Ocurrio un error a la hora de abrir el documento');
    }
  };

  const handleBorrarDoc = () => {
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
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          className="flex flex-col items-center justify-center p-4 cursor-pointer"
          onClick={() => handleAbrirDoc()}
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
          <small className="text-gray-600">{documento.categoria}</small>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => handleAbrirDoc()}
          className="flex flex-row gap-2"
        >
          <FaFilePdf /> Ver Documento
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => handleBorrarDoc()}
          className="flex flex-row gap-2"
        >
          <FaTrash /> Eliminar Documento
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
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
