import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ListarUsuarios, BuscarUsuario } from '../Api/UsuariosApi';

export function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ListarUsuarios();
        setUsuarios(response.data);
      } catch (error) {
        console.log(1);
        Cookies.remove('token');
        setError(error.response.data);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const actualizarUsuarios = async () => {
    try {
      const response = await ListarUsuarios();
      setUsuarios(response.data);
    } catch (error) {
      console.log(2);
      Cookies.remove('token');
      setError(error.response.data);
    }
  };

  const buscarUsuarios = async search => {
    try {
      const response = await BuscarUsuario(search);
      if (response) {
        setUsuarios(response.data);
      }
    } catch (error) {
      console.log(3);
      Cookies.remove('token');
      setError(error.response.data);
    }
  };

  if (!token) {
    return { usuarios: [], actualizarUsuarios: () => {} };
  }

  if (error) {
    return { usuarios: [], actualizarUsuarios: () => {} };
  }

  return { usuarios, actualizarUsuarios, buscarUsuarios };
}
