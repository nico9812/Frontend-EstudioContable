import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Form, CloseButton, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { LoadingIndicator } from '../common/LoadingIndicator';
import {
  useAddNewProgramaMutation,
  useGetProgramasQuery,
  useUpdateProgramaMutation
} from '@/redux/api/programasApiSlice';

const yupSchema = yup.object().shape({
  nombre: yup.string().required('Este campo es requerido.'),
  resolucion: yup.string().required('Este campo es requerido.'),
  localidad: yup.string().required('Este campo es requerido.'),
  fecha_inicio: yup
    .date()
    .typeError('Este campo es Requerido')
    .required('Este campo es requerido'),
  fecha_final: yup
    .date()
    .typeError('Este campo es Requerido')
    .required('Este campo es requerido'),
  dias: yup
    .number()
    .typeError('Este campo es Requerido')
    .required('Este campo es requerido'),
  profesional: yup.string().required('Este campo es requerido.'),
  estado: yup.string().required('Este campo es requerido.')
});

const ModalFormProgramas = ({ location, navigateBack }) => {
  const isEditPage = location.pathname.includes('edit');

  const { userId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(yupSchema)
  });

  const { programa, isLoading } = useGetProgramasQuery(userId, {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      programa: data?.entities[userId],
      isLoading,
      isSuccess
    })
  });

  const [addNewPrograma] = useAddNewProgramaMutation();
  const [updatePrograma] = useUpdateProgramaMutation();

  useEffect(() => {
    if (isEditPage && programa) {
      setValue('nombre', programa.nombre);
    }
  }, [isEditPage, programa, setValue]);

  const titulo = isEditPage ? 'Edición de Categoria' : 'Registrar Categoria';

  const onSubmit = async data => {
    if (!isEditPage) {
      try {
        await addNewPrograma({ ...data, usuario: userId }).unwrap();
        // reset();
        // navigateBack();
        toast.success('El cliente fue creado exitosamente.');
      } catch (err) {
        navigateBack();
        toast.error('Hubo un error a la hora crear el Usuario.');
      }
    } else {
      try {
        await updatePrograma({
          data,
          userId
        }).unwrap();
        reset();
        navigateBack();
        toast.success('El cliente fue editado exitosamente.');
      } catch (err) {
        navigateBack();
        toast.error('Hubo un error a la hora editar el Usuario.');
      }
    }
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{titulo}</Modal.Title>
        <CloseButton
          className="btn btn-circle btn-sm transition-base p-0"
          onClick={navigateBack}
        />
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="d-flex flex-column gap-3 my-3 mx-4"
        >
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Ingrese el nombre del Programa"
              {...register('nombre')}
            />
            {errors.nombre && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.nombre.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="resolucion">
            <Form.Label>Resolucion</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Ingrese la resolución del Programa"
              {...register('resolucion')}
            />
            {errors.resolucion && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.resolucion.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="localidad">
            <Form.Label>Localidad</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Ingrese la localidad del Programa"
              {...register('localidad')}
            />
            {errors.localidad && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.localidad.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="fecha_inicio">
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control
              type="date"
              autoComplete="off"
              {...register('fecha_inicio')}
            />
            {errors.fecha_inicio && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.fecha_inicio.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="fecha_final">
            <Form.Label>Fecha de Finalización</Form.Label>
            <Form.Control
              type="date"
              autoComplete="off"
              {...register('fecha_final')}
            />
            {errors.fecha_final && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.fecha_final.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="dias">
            <Form.Label>Días</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Ingrese los días del Programa"
              {...register('dias')}
            />
            {errors.dias && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.dias.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="profesional">
            <Form.Label>Profesional</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Ingrese el Profesional del Programa"
              {...register('profesional')}
            />
            {errors.profesional && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.profesional.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="estado">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Ingrese los Estado del Programa"
              {...register('estado')}
            />
            {errors.estado && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.estado.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="me-2 mb-1"
          disabled={!isDirty}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </>
  );
};

ModalFormProgramas.propTypes = {
  location: PropTypes.object,
  navigateBack: PropTypes.func
};

export default ModalFormProgramas;
