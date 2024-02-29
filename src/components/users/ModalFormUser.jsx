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

const ModalFormUser = ({ location, navigateBack }) => {
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

  const onSubmit = async data => {
    if (!isEditPage) {
      try {
        await addNewUser(data).unwrap();
        reset();
        navigateBack();
        toast.success('El cliente fue creado exitosamente.');
      } catch (err) {
        console.error('Failed to save the post', err);
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
        console.error('Failed to save the post', err);
      }
    }
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {location.title || 'Titulo'}
        </Modal.Title>
        <CloseButton
          className="btn btn-circle btn-sm transition-base p-0"
          onClick={navigateBack}
        />
      </Modal.Header>
      <Modal.Body>
        <Form autoComplete="off" className="d-flex flex-column gap-3 my-3 mx-4">
          <h3>{titulo}</h3>
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
ModalFormUser.propTypes = {
  location: PropTypes.object,
  navigateBack: PropTypes.func
};

export default ModalFormUser;
