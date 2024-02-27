import React, { useEffect, useState } from 'react';
import { ListarVen } from '../Api/VencimientosApi';
import Cookies from 'js-cookie';

export function UsVen(iduser) {
    const [vencimientos, setVencimientos] = useState([]);
    const [error, setError] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ListarVen(iduser);
                setVencimientos(response.data);
            } catch (error) {
                Cookies.remove('token');
                setError(error.response.data);
            }
        };

        if (token) {
            fetchData();
        }
    }, [iduser, token]);

    const actualizarVencimientos = async () => {
        try {
            const response = await ListarVen(iduser);
            setVencimientos(response.data);
        } catch (error) {
            Cookies.remove('token');
            setError(error.response.data);
        }
    };

    if (!token) {
        return { vencimientos: [], actualizarVencimientos: () => { } };
    }

    if (error) {
        return { vencimientos: [], actualizarVencimientos: () => { } };
    }

    return { vencimientos, actualizarVencimientos, iduser };
}

