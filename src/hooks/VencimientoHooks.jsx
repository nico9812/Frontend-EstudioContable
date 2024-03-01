import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export const VencimientoHooks = vencimientos => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const transformarEventos = () => {
      const datosMapeados = vencimientos.map(evento => {
        return {
          id: evento.id,
          title: evento.nombre,
          start: dayjs(evento.fecha),
          end: dayjs(evento.fecha),
          alarma: evento.alarma
        };
      });

      return datosMapeados;
    };

    if (vencimientos.length > 0) {
      setEventos(transformarEventos());
    }
  }, [vencimientos]);

  return { eventos };
};
