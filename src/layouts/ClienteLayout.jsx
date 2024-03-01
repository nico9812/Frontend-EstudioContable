import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const ClienteLayout = ({ grupo }) => {
  if (grupo !== 2) {
    toast.error('No tienes permiso para ingresar a esta ruta.');
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
};

ClienteLayout.propTypes = {
  grupo: PropTypes.number
};

export default ClienteLayout;
