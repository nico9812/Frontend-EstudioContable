import { Navigate } from 'react-router-dom';
import { useAuthContext } from './authContext';
import Cookies from 'js-cookie';

export const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const group = Cookies.get('group');

  if (isAuthenticated) {
    if (group == '1') {
      return <Navigate to="/Clientes/" />;
    } else if (group == '2') {
      return <Navigate to="/vencimientos/" />;
    }
  }

  return children;
};
