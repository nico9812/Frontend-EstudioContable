import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@/redux/reducer/authReducerSlice';
import { useEffect, useState } from 'react';
import { useValidateTokenMutation } from '@/redux/api/authApiSlice';

const RequireAuth = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  const [validateToken] = useValidateTokenMutation();

  const callValidate = async () => {
    await validateToken()
      .unwrap()
      .then(() => {
        setValidated(true);
      })
      .catch(() => {
        return navigate('/login', {
          replace: true
        });
      });
  };

  useEffect(() => {
    if (!validated) {
      callValidate();
    }
  }, []);

  if (!token) {
    return navigate('/login', {
      replace: true,
      state: { from: location }
    });
  }

  return validated && token !== '' && <Outlet />;
};
export default RequireAuth;
