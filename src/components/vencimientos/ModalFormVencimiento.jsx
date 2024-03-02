import { useEffect } from 'react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Form, CloseButton, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { LoadingIndicator } from '../common/LoadingIndicator';
import {
  useAddNewVencimientoMutation,
  useGetVencimientosQuery,
  useUpdateVencimientoMutation
} from '@/redux/api/vencimientosApiSlice';
import { toast } from 'react-toastify';
import Flex from '../common/Flex';

const addOrEditPasswordSchema = yup.object().shape({
  nombre: yup
    .string()
    .max(30, 'Debe tener una longitud de 30 caracteres')
    .required('Este campo es requerido.'),
  fecha: yup
    .string()
    .max(30, 'Debe tener una longitud de 30 caracteres')
    .required('Este campo es requerido.'),
  alarma: yup.bool().required('Este campo es requerido.')
});

const ModalFormVencimiento = ({ location, navigateBack, navigate }) => {
  const { userId, vencimientoId } = useParams();
  const isEditPage = location.pathname.includes('edit');

  const { vencimientos: vencimiento, isLoading } = useGetVencimientosQuery(
    userId,
    {
      selectFromResult: ({ data, isLoading, isSuccess }) => {
        return {
          vencimientos: data?.entities[vencimientoId],
          isLoading,
          isSuccess
        };
      }
    }
  );

  const [addNewVencimiento] = useAddNewVencimientoMutation();
  const [updateVencimiento] = useUpdateVencimientoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(addOrEditPasswordSchema)
  });

  useEffect(() => {
    if (isEditPage && vencimiento) {
      setValue('nombre', vencimiento.nombre);
      setValue('fecha', vencimiento.fecha);
      setValue('alarma', vencimiento.alarma);
    }
  }, [isEditPage, vencimiento, setValue]);

  const titulo = isEditPage
    ? 'Edición de Vencimiento'
    : 'Registrar Vencimiento';

  const onBorrarClick = () => {
    return navigate(
      `/dashboard/contador/vencimientos/${userId}/borrar/${vencimientoId}`,
      {
        state: {
          backgroundLocation: location.state.backgroundLocation
        }
      }
    );
  };

  const onSubmit = async data => {
    if (!isEditPage) {
      try {
        await addNewVencimiento({ ...data, propietario: userId }).unwrap();
        reset();
        navigateBack();
        toast.success('El Vencimiento fue creado exitosamente.');
      } catch (err) {
        console.error('Failed to save the post', err);
      }
    } else {
      try {
        await updateVencimiento({
          data: { ...data, propietario: userId },
          vencimientoId
        }).unwrap();
        reset();
        navigateBack();
        toast.success('El cliente fue editado exitosamente.');
      } catch (err) {
        console.error('Failed to save the post', err);
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
            <Form.Label>Nombre del Vencimiento</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Ingresa el Nombre del Vencimiento"
              {...register('nombre')}
            />
            {errors.nombre && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.nombre.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="fecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              autoComplete="off"
              type="date"
              {...register('fecha')}
            />
            {errors.fecha && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.fecha.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="alarma">
            <Form.Check
              autoComplete="off"
              type="switch"
              label="¿Alarma activada?"
              {...register('alarma')}
            />
            {errors.alarma && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.alarma.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>
        <Flex className="gap-4">
          {isEditPage && (
            <Button variant="danger" onClick={onBorrarClick}>
              Borrar
            </Button>
          )}
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty}
          >
            Guardar
          </Button>
        </Flex>
      </Modal.Footer>
    </>
  );
};

ModalFormVencimiento.propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.any,
  navigateBack: PropTypes.func
};

export default ModalFormVencimiento;
