import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { LogoutUser } from '../../Api/UsuariosApi';

export function Logout() {
  const token = Cookies.get('token');

  useEffect(() => {
    const performLogout = async () => {
      Cookies.remove('token');
      Cookies.remove('group');
      Cookies.remove('id');
      logout();
    };

    performLogout();
  }, []);

  if (token != undefined && token != '') {
    LogoutUser();
  }

  return <Navigate to="/" />;
}
