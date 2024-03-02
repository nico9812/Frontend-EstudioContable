import { CloseButton, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDeleteCategoriaMutation } from '@/redux/api/categoriasApiSlice';
import Flex from '../common/Flex';
import { toast } from 'react-toastify';

const ModalBorradoCategorias = ({ location, navigateBack, navigate }) => {
  const { categoriaId } = useParams();

  const titulo = 'Borrar Categoria';

  const [deleteCategoria] = useDeleteCategoriaMutation();

  const onBorrarClick = async () => {
    try {
      await deleteCategoria(categoriaId).unwrap();
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
          Estas apunto de borrar esta Categoria. ¿Estas seguro de querer
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

ModalBorradoCategorias.propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.any,
  navigateBack: PropTypes.func
};

export default ModalBorradoCategorias;
