import React, { useEffect, useState } from 'react';
import { ListarVen } from '../Api/VencimientosApi';

export function UsVen(iduser) {
  const [vencimientos, setVencimientos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ListarVen(iduser);
        setVencimientos(response.data);
      } catch (error) {
        setError(error.response.data);
      }
    };

    fetchData();
  }, [setVencimientos]);

  return { vencimientos, iduser };
}
