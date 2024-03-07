import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDeleteVencimientoMutation } from '@/redux/api/vencimientosApiSlice';
import { toast } from 'react-toastify';
import {
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogHeader
} from '../ui/dialog';
import { Button } from '../ui/button';

const ModalBorradoVencimiento = ({ location, navigateBack, navigate }) => {
  const { vencimientoId } = useParams();

  const [deleteVencimiento] = useDeleteVencimientoMutation();

  const titulo = 'Borrado de Vencimiento';

  const onBorrarClick = async () => {
    try {
      await deleteVencimiento(vencimientoId).unwrap();
      navigate(location.state.backgroundLocation.pathname);
      toast.success('El cliente fue editado exitosamente.');
    } catch (err) {
      console.error('Failed to save the post', err);
    }
  };

  return (
    <DialogContent closeAction={navigateBack}>
      <DialogHeader>
        <DialogTitle id="contained-modal-title-vcenter">{titulo}</DialogTitle>
      </DialogHeader>
      <span>
        Estas apunto de borrar este Vencimiento. ¿Estas seguro de querer
        borrarlo?
      </span>
      <DialogFooter className="justify-content-between">
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

ModalBorradoVencimiento.propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.any,
  navigateBack: PropTypes.func
};

export default ModalBorradoVencimiento;
