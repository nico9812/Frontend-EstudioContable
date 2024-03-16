import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { VencimientoHooks } from '@/hooks/VencimientoHooks';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '../ui/button';
import { useWindowWidth } from '@react-hook/window-size';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import es from 'date-fns/locale/es';
import { addMonths, startOfMonth, subMonths } from 'date-fns';

const locales = {
  es: es
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

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
  showMore: total => `+${total} más`
};

export const Calendario = ({
  vencimientos,
  group,
  // refetch,
  params,
  setSearchParams,
  searchParams
}) => {
  const { userId } = params;
  const location = useLocation();
  const navigate = useNavigate();

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const { eventos } = VencimientoHooks(vencimientos);

  const view = mobileWidth ? 'agenda' : 'month';

  const defaultDate =
    searchParams.get('month') && searchParams.get('year')
      ? startOfMonth(
          new Date(
            parseInt(searchParams.get('year')),
            parseInt(searchParams.get('month')) - 1
          )
        )
      : new Date();

  const eventPropGetter = event => {
    if (event.alarma) {
      return {
        className: '!bg-red-500'
      };
    }
    return {
      className: '!bg-blue-500'
    };
  };

  const handleNavigate = async (date, action) => {
    let newDate;
    if (action === 'PREV') {
      newDate = subMonths(date, 1);
    } else if (action === 'NEXT') {
      newDate = addMonths(date, 1);
    } else {
      newDate = date;
    }
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    setSearchParams({ year, month });
  };

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

  const onSelectEvent = event => {
    const vencimientoId = event.id;
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
        culture="es"
        localizer={localizer}
        views={['month', 'agenda']}
        defaultView={view}
        messages={messages}
        events={eventos}
        eventPropGetter={eventPropGetter}
        defaultDate={defaultDate}
        onNavigate={handleNavigate}
        onSelectEvent={group === 1 ? onSelectEvent : undefined}
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
