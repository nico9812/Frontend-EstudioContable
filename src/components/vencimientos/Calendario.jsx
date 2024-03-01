import '@/components/vencimientos/calendario.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useSelector } from 'react-redux';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import { selectCurrentGroup } from '@/redux/reducer/authReducerSlice';
import dayjs from 'dayjs';
import { VencimientoHooks } from '@/hooks/VencimientoHooks';
import { Button } from 'react-bootstrap';
import IconAction from '@/components/common/IconAction';
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

export const Calendario = ({ vencimientos }) => {
  const { id: userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const localizer = dayjsLocalizer(dayjs);

  const group = useSelector(selectCurrentGroup);

  const { eventos } = VencimientoHooks(vencimientos);

  // eslint-disable-next-line no-unused-vars
  const eventStyleGetter = event => {
    let backgroundColor = event.alarma ? 'red' : 'green';
    const style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  };

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
            <IconAction
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
        views={['month']}
        messages={messages}
        events={eventos}
        {...(group === 1 && { onSelectEvent })}
        eventPropGetter={eventStyleGetter}
        onShowMore={onShowMore}
        components={{
          toolbar: CustomToolbar
        }}
      />
    </div>
  );
};

Calendario.propTypes = {
  vencimientos: PropTypes.array
};
