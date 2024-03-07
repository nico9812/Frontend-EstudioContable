import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Children, cloneElement } from 'react';
import { Dialog } from "../ui/dialog";

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
    <Dialog open>{childrenWithProps}</Dialog>

    // <Modal
    //   show={true}
    //   size="lg"
    //   aria-labelledby="contained-modal-title-vcenter"
    //   centered
    // >
    //   {childrenWithProps}
    // </Modal>
  );
};

ModalUsable.propTypes = {
  children: PropTypes.node
};
