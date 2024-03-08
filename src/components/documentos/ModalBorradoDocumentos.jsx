import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDeleteDocumentoMutation } from '@/redux/api/documentosApiSlice';
import { toast } from 'react-toastify';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Button } from '../ui/button';

const ModalBorradoDocumentos = ({ location, navigateBack, navigate }) => {
  const { documentoId } = useParams();

  const titulo = '¿Estas seguro de querer borrar este Documento?';

  const [deleteDocumento] = useDeleteDocumentoMutation();

  const onBorrarClick = async () => {
    try {
      await deleteDocumento(documentoId).unwrap();
      navigate(location.state.backgroundLocation.pathname);
      toast.success('El Documento fue borrado exitosamente.');
    } catch (err) {
      navigate(location.state.backgroundLocation.pathname);
      toast.error('Hubo un error a la hora de borrar el Documento.');
    }
  };

  return (
    <DialogContent closeAction={navigateBack}>
      <DialogHeader>
        <DialogTitle>{titulo}</DialogTitle>
      </DialogHeader>
      <span>
        Estas apunto de borrar este Documento. ¿Estas seguro de querer borrarlo?
      </span>
      <DialogFooter className="sm:justify-between">
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>
        <Button variant="destructive" onClick={onBorrarClick}>
          Borrar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

ModalBorradoDocumentos.propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.any,
  navigateBack: PropTypes.func
};

export default ModalBorradoDocumentos;
