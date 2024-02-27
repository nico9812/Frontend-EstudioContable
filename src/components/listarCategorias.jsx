
import React, { useEffect, useState } from 'react';
import { ListarCat } from '../Api/DocumentosApi';
import Cookies from 'js-cookie';

export function UsCat() {
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ListarCat();
                setCategorias(response.data);
            } catch (error) {
                Cookies.remove('token');
                setError(error.response.data);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    const actualizarCategorias = async () => {
        try {
            const response = await ListarCat();
            setCategorias(response.data);
        } catch (error) {
            Cookies.remove('token');
            setError(error.response.data);
        }
    };

    if (!token) {
        return { categorias: [], actualizarCategorias: () => { } };
    }

    if (error) {
        return { categorias: [], actualizarCategorias: () => { } };
    }

    return { categorias, actualizarCategorias };
}

