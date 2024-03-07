import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDeleteUserMutation } from '@/redux/api/usersApiSlice';
import { toast } from 'react-toastify';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Button } from '../ui/button';

const ModalBorradoUser = ({ location, navigateBack, navigate }) => {
  const { userId } = useParams();

  const titulo = 'Borrar Usuario';

  const [deleteUser] = useDeleteUserMutation();

  const onBorrarClick = async () => {
    try {
      await deleteUser(userId).unwrap();
      navigate(location.state.backgroundLocation.pathname);
      toast.success('El cliente fue borrado exitosamente.');
    } catch (err) {
      navigate(location.state.backgroundLocation.pathname);
      toast.success('Hubo un error a la hora de borrar el cliente.');
    }
  };

  return (
    <DialogContent closeAction={navigateBack}>
      <DialogHeader>
        <DialogTitle id="contained-modal-title-vcenter">{titulo}</DialogTitle>
      </DialogHeader>
      <span>
        Estas apunto de borrar este Usuario. ¿Estas seguro de querer borrarlo?
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

ModalBorradoUser.propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.any,
  navigateBack: PropTypes.func
};

export default ModalBorradoUser;
