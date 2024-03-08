import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { VencimientoHooks } from '@/hooks/VencimientoHooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import PropTypes from 'prop-types';
import { Button } from '../ui/button';
import { useWindowWidth } from '@react-hook/window-size';

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

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const { eventos } = VencimientoHooks(vencimientos);
  const view = mobileWidth ? 'agenda' : 'month';

  const CustomToolbar = toolbar => {
    return (
      <div className="rbc-toolbar grid w-full grid-cols-1 sm:justify-items-end sm:grid-cols-2 gap-2">
        <div className="w-full rbc-btn-group grid grid-cols-2 lg:grid-cols-4">
          <Button onClick={() => toolbar.onNavigate('TODAY')}>Hoy</Button>
          <Button onClick={() => toolbar.onNavigate('PREV')}>Anterior</Button>
          <Button onClick={() => toolbar.onNavigate('NEXT')}>Siguiente</Button>
          {group == 1 && (
            <Button
              onClick={() => {
                return navigate(
                  `/dashboard/contador/vencimientos/${userId}/agregar`,
                  {
                    state: {
                      backgroundLocation: location
                    }
                  }
                );
              }}
            >
              Agregar
            </Button>
          )}
        </div>
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
        view={view}
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
