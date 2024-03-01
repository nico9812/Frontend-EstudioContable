import { useEffect, useState } from 'react';
import { ListarCat } from '../Api/DocumentosApi';

export function UsCat() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ListarCat();
        setCategorias(response.data);
      } catch (error) {
        console.log('error');
      }
    };

    fetchData();
  }, []);

  return { categorias };
}
