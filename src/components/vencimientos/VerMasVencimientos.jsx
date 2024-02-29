import PropTypes from 'prop-types';
import { Button, Modal, CloseButton } from 'react-bootstrap';

const VerMasVencimientos = ({ location, navigateBack }) => {
  const title = '';

  return (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        <CloseButton
          className="btn btn-circle btn-sm transition-base p-0"
          onClick={navigateBack}
        />
      </Modal.Header>
      <Modal.Body>Hola</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>

        <Button variant="primary" type="submit" className="me-2 mb-1">
          Guardar
        </Button>
      </Modal.Footer>
    </>
  );
};

VerMasVencimientos.propTypes = {
  location: PropTypes.any,
  navigateBack: PropTypes.any
};
export default VerMasVencimientos;
