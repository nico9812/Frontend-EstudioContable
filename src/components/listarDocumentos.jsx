import '../static/css/home.css';
import React, { useEffect, useState } from 'react';
import { ListarDoc, FiltrarDoc } from '../Api/DocumentosApi';
import Cookies from 'js-cookie';

export function UsDoc(iduser) {
    const [documentos, setDocumentos] = useState([]);
    const [error, setError] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ListarDoc(iduser);
                setDocumentos(response.data);
            } catch (error) {
                Cookies.remove('token');
                setError(error.response.data);
            }
        };

        if (token) {
            fetchData();
        }
    }, [iduser, token]);

    const actualizarDocumentos = async () => {
        try {
            const response = await ListarDoc(iduser);
            setDocumentos(response.data);
        } catch (error) {
            Cookies.remove('token');
            setError(error.response.data);
        }
    };

    const filtrarDocumentos = async (categoria,id) => {
        try {
            const response = await FiltrarDoc(categoria,id);
            setDocumentos(response.data);
        } catch (error) {
            Cookies.remove('token');
            setError(error.response.data);
        }
    };

    if (!token) {
        return { documentos: [], actualizarDocumentos: () => {} };
    }

    if (error) {
        return { documentos: [], actualizarDocumentos: () => {} };
    }

    return { documentos, actualizarDocumentos, iduser, filtrarDocumentos };
}

