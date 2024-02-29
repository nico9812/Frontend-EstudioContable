import '@/components/vencimientos/calendario.scss';

import { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import {
  GuardarVencimiento,
  ModificarVencimiento,
  DeleteVencimiento
} from '../../Api/VencimientosApi';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';
import { selectCurrentGroup } from '@/redux/reducer/authReducerSlice';

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

export function Calendario(dat) {
  const localizer = dayjsLocalizer(dayjs);
  const { register, handleSubmit, reset, setValue } = useForm();

  const group = useSelector(selectCurrentGroup);

  const [eventos, setEventos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAbiertoMod, setModalAbiertoMod] = useState(false);
  const [confirmarEliminarMod, setConfirmarEliminarMod] = useState(false);
  const [eventsForDay, setEventsForDay] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [errorForm, setErrorForm] = useState({});

  const id = dat.datos.iduser ? dat.datos.iduser : null;

  const { actualizarVencimientos, vencimientos } = dat.datos;

  const [vencimientoSelected, setVencimientoSelected] = useState(null);

  // Agregar vencimiento

  const onSubmit = handleSubmit(async data => {
    data.propietario = id;
    setErrorForm({});
    try {
      const response = await GuardarVencimiento(data);
      if (response.status === 201) {
        actualizarVencimientos();
        cerrarModal();
        reset();
      } else {
        console.log('error');
      }
    } catch (error) {
      if (error.response) {
        setErrorForm(error.response.data.errors || {});
        // Aquí puedes manejar los errores, mostrar mensajes, etc.
      }
    }
  });

  const abrirModal = () => {
    setModalAbierto(true);
    setModalAbiertoMod(false);
    setShowMore(false);
    setConfirmarEliminarMod(false);
    reset();
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    reset();
  };

  // Listar Eventos

  // eslint-disable-next-line no-unused-vars
  const eventStyleGetter = (event, start, end, isSelected) => {
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

  useEffect(() => {
    if (vencimientos.length > 0) {
      setEventos(transformarEventos());
    }
  }, [vencimientos]);

  // Personalizar barra de opciones
  const CustomToolbar = toolbar => {
    return (
      <div className="rbc-toolbar d-flex justify-content-between">
        <span className="rbc-btn-group">
          <button type="button" onClick={() => toolbar.onNavigate('TODAY')}>
            Hoy
          </button>
          <button type="button" onClick={() => toolbar.onNavigate('PREV')}>
            Anterior
          </button>
          <button type="button" onClick={() => toolbar.onNavigate('NEXT')}>
            Siguiente
          </button>
          {group == 1 && (
            <button onClick={abrirModal}>Nuevo Vencimiento</button>
          )}
        </span>
        <span>{toolbar.label}</span>
      </div>
    );
  };

  // Editar Vencimientos

  const onSelectEvent = evento => {
    setVencimientoSelected(evento); // Almacena la ID del evento seleccionado
    setValue('nombre', evento.title);
    setValue('alarma', evento.alarma);
    setValue('fecha', evento.start.format('YYYY-MM-DD'));
    abrirModalMod(); // Abre el modal para confirmar la eliminación
  };

  const onSelectEventShow = evento => {
    setVencimientoSelected(evento); // Almacena el evento seleccionado
    setValue('nombre', evento.title);
    setValue('alarma', evento.alarma);
    setValue('fecha', evento.start.format('YYYY-MM-DD'));
    abrirModalMod(); // Abre el modal para confirmar la eliminación
  };

  const onSubmitMod = handleSubmit(async data => {
    data.propietario = id;
    setErrorForm({});
    try {
      const response = await ModificarVencimiento(vencimientoSelected.id, data);
      setVencimientoSelected(null);
      if (response.status === 200) {
        actualizarVencimientos();
        cerrarModalMod();
        reset();
        if (showMore) {
          cerrarShowMore();
        }
      } else {
        console.log('error');
      }
    } catch (error) {
      if (error.response) {
        setErrorForm(error.response.data.errors || {});
        // Aquí puedes manejar los errores, mostrar mensajes, etc.
      }
    }
  });

  const abrirModalMod = () => {
    setModalAbiertoMod(true);
    setModalAbierto(false);
    setShowMore(false);
    setConfirmarEliminarMod(false);
  };

  const cerrarModalMod = () => {
    setModalAbiertoMod(false);
    reset();
  };

  // Eliminar Vencimiento
  const abrirConfirm = () => {
    setConfirmarEliminarMod(true);
    setModalAbiertoMod(false);
  };

  const cerrarConfirm = () => {
    setConfirmarEliminarMod(false);
  };

  const handleDeleteVen = async id => {
    if (id) {
      try {
        const response = await DeleteVencimiento(id);
        setVencimientoSelected(null);
        if (response.status == 204) {
          actualizarVencimientos();
          cerrarConfirm();
          cerrarModalMod();
          if (showMore) {
            cerrarShowMore();
          }
        }
      } catch (error) {
        if (error.response.data.errors) {
          setErrorForm(error.response.data.errors || {});
        }
      }
    }
  };

  // ver mas de un evento

  const abrirShowMore = (events, date) => {
    setEventsForDay(
      events.filter(event => dayjs(event.start).isSame(date, 'day'))
    );
    setShowMore(true);
    setModalAbierto(false);
    setModalAbiertoMod(false);
    setConfirmarEliminarMod(false);
  };

  const cerrarShowMore = () => {
    setShowMore(false);
  };

  return (
    <div className="calendario w-100 p-4 text-dark">
      <Calendar
        localizer={localizer}
        views={['month']}
        messages={messages}
        events={eventos}
        onSelectEvent={group == 1 ? onSelectEvent : undefined}
        eventPropGetter={eventStyleGetter}
        onShowMore={abrirShowMore}
        components={{
          toolbar: CustomToolbar
        }}
      />

      <Modal
        isOpen={modalAbierto}
        onRequestClose={cerrarModal}
        contentLabel="NuevoVencimiento"
        className="mi-modalForm"
        overlayClassName="mi-overlay"
        style={{
          overlay: {
            zIndex: 1000 // ajusta este valor según sea necesario
          },
          content: {
            zIndex: 1001 // ajusta este valor según sea necesario
          }
        }}
      >
        <Form onSubmit={onSubmit} className="login">
          <h2>Nuevo Vencimiento</h2>
          <Form.Group as={Row} className="mb-4" controlId="formPlaintextnombre">
            <Col sm="15">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Nombre del Vencimiento"
                {...register('nombre', { required: true })}
              />
            </Col>
            {errorForm.nombre && <span>{errorForm.nombre[0]}</span>}
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="formPlaintextfecha">
            <Col sm="15">
              <Form.Control
                size="lg"
                type="date"
                placeholder="fecha"
                {...register('fecha', { required: true })}
              />
            </Col>
            {errorForm.fecha && <span>{errorForm.fecha[0]}</span>}
          </Form.Group>

          <Form.Check
            type="switch"
            id="custom-switch"
            label="¿Alarma activada?"
            {...register('alarma')}
          />

          {errorForm && <span>{errorForm[0]}</span>}
          <Col sm="15" className="d-flex justify-content-between mt-5">
            <Button variant="success" type="submit">
              Guardar
            </Button>
            <Button variant="secondary" onClick={cerrarModal}>
              Cancelar
            </Button>
          </Col>
        </Form>
      </Modal>

      <Modal
        isOpen={modalAbiertoMod}
        onRequestClose={cerrarModalMod}
        contentLabel="Modificacion"
        className="mi-modalForm"
        overlayClassName="mi-overlay"
        style={{
          overlay: {
            zIndex: 1000 // ajusta este valor según sea necesario
          },
          content: {
            zIndex: 1001 // ajusta este valor según sea necesario
          }
        }}
      >
        <Form onSubmit={onSubmitMod} className="login">
          <h2>Modificar</h2>
          <Form.Group as={Row} className="mb-4" controlId="formPlaintextnombre">
            <Col sm="15">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Nombre del Vencimiento"
                {...register('nombre', { required: true })}
              />
            </Col>
            {errorForm.nombre && <span>{errorForm.nombre[0]}</span>}
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="formPlaintextfecha">
            <Col sm="15">
              <Form.Control
                size="lg"
                type="date"
                placeholder="fecha"
                {...register('fecha', { required: true })}
              />
            </Col>
            {errorForm.fecha && <span>{errorForm.fecha[0]}</span>}
          </Form.Group>

          <Form.Check
            type="switch"
            id="custom-switch"
            label="¿Alarma activada?"
            {...register('alarma')}
          />

          {errorForm && <span>{errorForm[0]}</span>}
          <Col sm="15" className="d-flex justify-content-between mt-5">
            <Button variant="success" type="submit">
              Guardar
            </Button>
            <Button variant="secondary" onClick={cerrarModalMod}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={abrirConfirm}>
              Eliminar
            </Button>
          </Col>
        </Form>
      </Modal>

      <Modal
        isOpen={confirmarEliminarMod}
        onRequestClose={cerrarConfirm}
        contentLabel="Confirmación"
        className="mi-modal"
        overlayClassName="mi-overlay"
        style={{
          overlay: {
            zIndex: 1001 // ajusta este valor según sea necesario
          },
          content: {
            zIndex: 1002 // ajusta este valor según sea necesario
          }
        }}
      >
        <p>
          ¿Estás seguro que deseas borrar el vencimiento{' '}
          {vencimientoSelected !== null && vencimientoSelected.title} de la
          fecha{' '}
          {vencimientoSelected !== null &&
            vencimientoSelected.start.format('DD-MM-YYYY')}{' '}
          ?
        </p>
        <div className="d-flex justify-content-between">
          <Button
            variant="danger"
            onClick={() => handleDeleteVen(vencimientoSelected.id)}
          >
            Eliminar
          </Button>
          <Button variant="secondary" onClick={cerrarConfirm}>
            Cancelar
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={showMore}
        onRequestClose={cerrarShowMore}
        contentLabel="Confirmación"
        className="mi-modal"
        overlayClassName="mi-overlay"
        style={{
          overlay: {
            zIndex: 999 // ajusta este valor según sea necesario
          },
          content: {
            zIndex: 1000 // ajusta este valor según sea necesario
          }
        }}
      >
        {eventsForDay !== null && (
          <>
            <h2>{eventsForDay[0].start.format('DD-MM-YYYY')}</h2>
            <div className="showMoreList">
              <ListGroup>
                {eventsForDay.map(ven => (
                  <ListGroup.Item
                    action
                    variant={ven.alarma ? 'danger' : 'info'}
                    key={ven.id}
                    onClick={
                      group == 1 ? () => onSelectEventShow(ven) : undefined
                    }
                  >
                    {ven.title}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </>
        )}
        <Button className="mt-5" variant="secondary" onClick={cerrarShowMore}>
          Cerrar
        </Button>
      </Modal>
    </div>
  );
}
