import { CloseButton, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDeleteVencimientoMutation } from '@/redux/api/vencimientosApiSlice';
import Flex from '../common/Flex';
import { toast } from 'react-toastify';

const ModalBorradoVencimiento = ({ location, navigateBack, navigate }) => {
  const { vencimientoId } = useParams();
  const isEditPage = location.pathname.includes('edit');

  const [deleteVencimiento] = useDeleteVencimientoMutation();

  const titulo = isEditPage
    ? 'Edición de Vencimiento'
    : 'Registrar Vencimiento';

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
          Estas apunto de borrar este Vencimiento. ¿Estas seguro de querer
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

ModalBorradoVencimiento.propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.any,
  navigateBack: PropTypes.func
};

export default ModalBorradoVencimiento;
