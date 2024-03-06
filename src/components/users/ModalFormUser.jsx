import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Form, CloseButton, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation
} from '@/redux/api/usersApiSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LoadingIndicator } from '../common/LoadingIndicator';
import Flex from '../common/Flex';

const addOrEditPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Debe ser un correo valido')
    .required('Este campo es requerido.'),
  username: yup
    .string()
    .max(30, 'Debe tener una longitud de 30 caracteres')
    .required('Este campo es requerido.'),
  password: yup
    .string()
    .max(30, 'Debe tener una longitud de 30 caracteres')
    .required('Este campo es requerido.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Este campo es requerido.')
});

const editSchema = yup.object().shape({
  email: yup
    .string()
    .email('Debe ser un correo valido')
    .required('Este campo es requerido.'),
  username: yup
    .string()
    .max(30, 'Debe tener una longitud de 30 caracteres')
    .required('Este campo es requerido.')
});

const ModalFormUser = ({ location, navigateBack, navigate }) => {
  const [passwordChange, setPasswordChange] = useState(false);
  const isEditPage = location.pathname.includes('edit');
  const { userId } = useParams();

  const yupSchema =
    !passwordChange && isEditPage ? editSchema : addOrEditPasswordSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(yupSchema)
  });

  const { user, isLoading } = useGetUsersQuery('getUsers', {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      user: data?.entities[userId],
      isLoading,
      isSuccess
    })
  });

  const [addNewUser] = useAddNewUserMutation();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (isEditPage && user) {
      setValue('email', user.email);
      setValue('username', user.username);
      setValue('password', user.password);
    }
  }, [isEditPage, user, setValue]);

  const titulo = isEditPage ? 'Edición de Cliente' : 'Registrar Cliente';

  const handleCheckboxChange = e => {
    setPasswordChange(e.target.checked);
  };

  const onBorrarClick = () => {
    return navigate(`/dashboard/contador/clientes/borrar/${userId}`, {
      state: {
        backgroundLocation: location.state.backgroundLocation
      }
    });
  };

  const onSubmit = async data => {
    if (!isEditPage) {
      try {
        await addNewUser(data).unwrap();
        reset();
        navigateBack();
        toast.success('El cliente fue creado exitosamente.');
      } catch (err) {
        navigateBack();
        toast.error('Hubo un error a la hora crear el Usuario.');
      }
    } else {
      try {
        await updateUser({
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
          {isEditPage && (
            <Form.Group>
              <Form.Check
                label="Habilitar cambio de Contraseña"
                onChange={handleCheckboxChange}
                checked={passwordChange}
              ></Form.Check>
            </Form.Group>
          )}

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoComplete="off"
              type="email"
              placeholder="Ingrese el Correo"
              {...register('email')}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.email.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Ingrese el Usuario"
              {...register('username')}
            />
            {errors.username && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.username.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {(!isEditPage || passwordChange) && (
            <>
              <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  autoComplete="new-password"
                  type="password"
                  placeholder="Ingrese la Contraseña"
                  {...register('password')}
                />
                {errors.password && (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.password.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="passwordConfirm">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control
                  autoComplete="new-password"
                  type="password"
                  placeholder="Confirma la Contraseña"
                  {...register('passwordConfirm')}
                />
                {errors.passwordConfirm && (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.passwordConfirm.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </>
          )}
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

ModalFormUser.propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.func,
  navigateBack: PropTypes.func
};

export default ModalFormUser;
