import { LoadingIndicator } from '@/components/common/LoadingIndicator';
import { useLogoutMutation } from '@/redux/api/authApiSlice';
import { logOut } from '@/redux/reducer/authReducerSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutData] = useLogoutMutation();

  useEffect(() => {
    const handleLogout = async () => {
      await logoutData()
        .then(() => {
          dispatch(logOut());
          toast.success('Sesión cerrada exitosamente.');
        })
        .finally(() => {
          navigate('/', { replace: true });
        });
    };
    handleLogout();
  }, []);

  return <LoadingIndicator />;
}
