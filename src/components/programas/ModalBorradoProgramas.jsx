import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDeleteProgramaMutation } from '@/redux/api/programasApiSlice';
import { toast } from 'react-toastify';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Button } from '../ui/button';

const ModalBorradoProgramas = ({ location, navigateBack, navigate }) => {
  const { programaId } = useParams();

  const titulo = 'Borrar Programa';

  const [deletePrograma] = useDeleteProgramaMutation();

  const onBorrarClick = async () => {
    try {
      await deletePrograma(programaId).unwrap();
      navigate(location.state.backgroundLocation.pathname);
      toast.success('El programa fue borrada exitosamente.');
    } catch (err) {
      navigate(location.state.backgroundLocation.pathname);
      toast.success('Hubo un error a la hora de borrar el programa.');
    }
  };

  return (
    <DialogContent closeAction={navigateBack}>
      <DialogHeader>
        <DialogTitle id="contained-modal-title-vcenter">{titulo}</DialogTitle>
      </DialogHeader>
      <span>
        Estas apunto de borrar este Programa. ¿Estas seguro de querer borrarlo?
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

ModalBorradoProgramas.propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.any,
  navigateBack: PropTypes.func
};

export default ModalBorradoProgramas;
