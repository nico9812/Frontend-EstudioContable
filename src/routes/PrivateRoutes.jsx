import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@/redux/reducer/authReducerSlice';
import { useState } from 'react';
import { useValidateTokenMutation } from '@/redux/api/authApiSlice';

const RequireAuth = () => {
  const [validated, setValidated] = useState(false);
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  const [validateToken] = useValidateTokenMutation();

  if (token && !validated) {
    validateToken().unwrap();
    setValidated(true);
  }

  return validated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
