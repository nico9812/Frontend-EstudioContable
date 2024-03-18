import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Children, cloneElement } from 'react';
import { Dialog } from '../ui/dialog';
import { useSelector } from 'react-redux';
import { selectCurrentGroup } from '@/redux/reducer/authReducerSlice';

export const ModalUsable = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const group = useSelector(selectCurrentGroup);

  function navigateBack() {
    navigate(-1, { replace: true });
  }

  const childrenWithProps = Children.map(children, child =>
    cloneElement(child, {
      location,
      navigateBack,
      navigate,
      group
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
