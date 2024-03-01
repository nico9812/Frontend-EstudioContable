import { CloseButton, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDeleteVencimientoMutation } from '@/redux/api/vencimientosApiSlice';
import Flex from '../common/Flex';
import { toast } from 'react-toastify';

const ModalBorradoDocumentos = ({ location, navigateBack, navigate }) => {
  const { documentoId } = useParams();

  const titulo = '¿Estas seguro de querer borrar este Documento?';

  const [deleteDocumento] = useDeleteVencimientoMutation();

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
          Estas apunto de borrar este Documento. ¿Estas seguro de querer
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

ModalBorradoDocumentos.propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.any,
  navigateBack: PropTypes.func
};

export default ModalBorradoDocumentos;
