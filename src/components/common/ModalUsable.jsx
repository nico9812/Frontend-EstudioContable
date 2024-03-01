import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Children, cloneElement } from 'react';

export const ModalUsable = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateBack() {
    navigate(-1, { replace: true });
  }

  const childrenWithProps = Children.map(children, child =>
    cloneElement(child, {
      location: location,
      navigateBack: navigateBack,
      navigate: navigate
    })
  );

  return (
    <Modal
      show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {childrenWithProps}
    </Modal>
  );
};

ModalUsable.propTypes = {
  children: PropTypes.node
};
