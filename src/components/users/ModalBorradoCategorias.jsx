import { CloseButton, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDeleteUserMutation } from '@/redux/api/usersApiSlice';
import Flex from '../common/Flex';
import { toast } from 'react-toastify';

const ModalBorradoUser = ({ location, navigateBack, navigate }) => {
  const { userId } = useParams();

  const titulo = 'Borrar Usuario';

  const [deleteUser] = useDeleteUserMutation();

  const onBorrarClick = async () => {
    try {
      await deleteUser(userId).unwrap();
      navigate(location.state.backgroundLocation.pathname);
      toast.success('La categoria fue borrada exitosamente.');
    } catch (err) {
      navigate(location.state.backgroundLocation.pathname);
      toast.success('Hubo un error a la hora de borrar la categoria.');
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{titulo}</Modal.Title>
        <CloseButton
          className="btn btn-circle btn-sm transition-base p-0"
          onClick={navigateBack}
        />
      </Modal.Header>
      <Modal.Body>
        <span>
          Estas apunto de borrar este Usuario. ¿Estas seguro de querer
          borrarlo?
        </span>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>
        <Flex className="gap-4">
          <Button variant="danger" onClick={onBorrarClick}>
            Borrar
          </Button>
        </Flex>
      </Modal.Footer>
    </>
  );
};

ModalBorradoUser.propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.any,
  navigateBack: PropTypes.func
};

export default ModalBorradoUser;
