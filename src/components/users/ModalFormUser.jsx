import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Form, CloseButton, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const loginSchema = yup.object().shape({
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

const ModalFormUser = ({ location, navigateBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm({
    resolver: yupResolver(loginSchema)
  });
  const isEditPage = location.pathname.includes('edit');
  const isEditAccion = location.state?.accion === 'edit_user';
  const editable = isEditPage && isEditAccion;

  const titulo = editable ? 'Edición de Cliente' : 'Registrar Cliente';

  const onSubmit = data => {
    console.log(data);
  };

  return (
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
          <Form.Group controlId="email">
            <Form.Control
              autoComplete="off"
              type="email"
              placeholder="Ingrese el Correo"
              {...register('email', { required: true })}
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
              {...register('username', { required: true })}
            />
            {errors.username && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.username.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              autoComplete="new-password"
              type="password"
              placeholder="Ingrese la Contraseña"
              {...register('password', { required: true })}
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
              {...register('passwordConfirm', { required: true })}
            />
            {errors.passwordConfirm && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.passwordConfirm.message}
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
ModalFormUser.propTypes = {
  location: PropTypes.object,
  navigateBack: PropTypes.func
};

export default ModalFormUser;
