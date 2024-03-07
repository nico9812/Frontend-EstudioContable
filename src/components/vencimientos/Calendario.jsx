import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { VencimientoHooks } from '@/hooks/VencimientoHooks';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import PropTypes from 'prop-types';
import { Button } from '../ui/button';

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
      <div className="rbc-toolbar flex justify-between mb-3">
        <span className="rbc-btn-group grid grid-cols-2 lg:grid-cols-4">
          <Button onClick={() => toolbar.onNavigate('TODAY')}>Hoy</Button>
          <Button onClick={() => toolbar.onNavigate('PREV')}>Anterior</Button>
          <Button onClick={() => toolbar.onNavigate('NEXT')}>Siguiente</Button>
          {group == 1 && (
            <Button>
              <Link
                to={`/dashboard/contador/vencimientos/${userId}/agregar`}
                state={{ backgroundLocation: location }}
              >
                Agregar
              </Link>
            </Button>
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
    <div className="w-full p-4 text-dark h-[600px]">
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
