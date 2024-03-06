import '@/components/vencimientos/calendario.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { VencimientoHooks } from '@/hooks/VencimientoHooks';
import { Button } from 'react-bootstrap';
import ButtonAction from '@/components/common/ButtonAction';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import PropTypes from 'prop-types';

dayjs.locale('es');

const messages = {
  today: 'Hoy',
  next: 'Siguiente',
  previous: 'Anterior',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  showMore: total => `Ver más (${total})`
};

export const Calendario = ({ vencimientos, group }) => {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const localizer = dayjsLocalizer(dayjs);

  const { eventos } = VencimientoHooks(vencimientos);

  const CustomToolbar = toolbar => {
    return (
      <div className="rbc-toolbar d-flex justify-content-between mb-3">
        <span className="rbc-btn-group">
          <Button type="button" onClick={() => toolbar.onNavigate('TODAY')}>
            Hoy
          </Button>
          <Button type="button" onClick={() => toolbar.onNavigate('PREV')}>
            Anterior
          </Button>
          <Button type="button" onClick={() => toolbar.onNavigate('NEXT')}>
            Siguiente
          </Button>
          {group == 1 && (
            <ButtonAction
              title="Nuevo Vencimiento"
              ruta={`/dashboard/contador/vencimientos/${userId}/agregar`}
              state={{ backgroundLocation: location }}
            />
          )}
        </span>
        <span>{toolbar.label}</span>
      </div>
    );
  };

  const onShowMore = date => {
    const newDate = date.at(0).start.$d.toISOString().split('T')[0];
    return navigate(`/dashboard/contador/vencimientos/${userId}/mostrar-mas`, {
      state: {
        backgroundLocation: location,
        day: newDate
      }
    });
  };

  const onSelectEvent = events => {
    const vencimientoId = events.id;
    return navigate(
      `/dashboard/contador/vencimientos/${userId}/editar/${vencimientoId}`,
      {
        state: {
          backgroundLocation: location
        }
      }
    );
  };

  return (
    <div className="calendario w-100 p-4 text-dark">
      <Calendar
        localizer={localizer}
        views={['month', 'agenda']}
        messages={messages}
        events={eventos}
        {...(group === 1 && { onSelectEvent })}
        onShowMore={onShowMore}
        components={{
          toolbar: CustomToolbar
        }}
      />
    </div>
  );
};

Calendario.propTypes = {
  group: PropTypes.number,
  vencimientos: PropTypes.array
};
