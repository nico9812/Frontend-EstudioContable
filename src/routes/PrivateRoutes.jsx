import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@/redux/reducer/authReducerSlice';

import Layout from '@/layouts/Layout';

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    <Layout />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
