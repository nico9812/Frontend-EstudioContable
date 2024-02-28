import { Link } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, CloseButton, Modal } from 'react-bootstrap';

export const ModalUsable = children => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();

  const stateLocation = location.state;

  function navigateBack() {
    navigate(-1, { replace: true });
  }

  if (!id) return navigate(-1, { replace: true });

  return (
    <Modal
      show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {stateLocation.title || 'Titulo'}
        </Modal.Title>
        <CloseButton
          className="btn btn-circle btn-sm transition-base p-0"
          onClick={navigateBack}
        />
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>
        <Link to={stateLocation.backgroundLocation} replace={true}>
          <Button variant="primary" className="me-2 mb-1">
            Confirmar
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};
