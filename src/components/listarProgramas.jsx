
import React, { useEffect, useState } from 'react';
import { ListarPro, BuscarPro } from '../Api/Programas';
import Cookies from 'js-cookie';

export function UsPro(iduser) {
    const [programas, setProgramas] = useState([]);
    const [error, setError] = useState(null);
    const token = Cookies.get('token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ListarPro(iduser);
                setProgramas(response.data);
            } catch (error) {
                Cookies.remove('token');
                setError(error.response.data);
            }
        };

        if (token) {
            fetchData();
        }
    }, [iduser, token]);

    const actualizarProgramas = async () => {
        try {
            const response = await ListarPro(iduser);
            setProgramas(response.data);
        } catch (error) {
            Cookies.remove('token');
            setError(error.response.data);
        }
    };

    const buscarProgramas = async (search) => {
        try {
            const response = await BuscarPro(search, iduser);
            setProgramas(response.data);
        } catch (error) {
            Cookies.remove('token');
            setError(error.response.data);
        }
    };

    if (!token) {
        return { programas: [], actualizarProgramas: () => { } };
    }

    if (error) {
        return { programas: [], actualizarProgramas: () => { } };
    }

    return { programas, actualizarProgramas, buscarProgramas, iduser };
}

