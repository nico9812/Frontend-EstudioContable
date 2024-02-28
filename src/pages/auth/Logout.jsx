import { useLogoutMutation } from '@/redux/api/authApiSlice';
import { logOut, selectCurrentToken } from '@/redux/reducer/authReducerSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Logout() {
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutData] = useLogoutMutation();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logoutData().unwrap();
        dispatch(logOut());
        toast.success('Sesión cerrada exitosamente.');
        navigate('/', {
          replace: true
        });
      } catch (error) {
        console.error('Logout failed:', error);
        toast.error('Error al cerrar sesión. Por favor, inténtalo de nuevo.');
      }
    };
    if (token !== undefined && token !== '') {
      handleLogout();
    }
  }, [token, dispatch, logoutData, navigate]);

  if (!(token !== undefined && token !== '')) {
    return <Navigate to="/" />;
  }

  return null;
}
