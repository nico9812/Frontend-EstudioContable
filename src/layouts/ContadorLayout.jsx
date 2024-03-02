import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const ContadorLayout = ({ grupo }) => {
  if (grupo !== 1) {
    toast.error('No tienes permiso para ingresar a esta ruta.');
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
  }
};

ContadorLayout.propTypes = {
  grupo: PropTypes.number
};

export default ContadorLayout;
