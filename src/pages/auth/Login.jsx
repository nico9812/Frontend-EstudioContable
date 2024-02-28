import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/reducer/authReducerSlice';
import { useLoginMutation } from '@/redux/api/authApiSlice';

import Form from 'react-bootstrap/Form';
import Flex from '@/components/common/Flex';
import { BsGearFill } from 'react-icons/bs';
import { BtnLoader } from '@/components/common/BtnLoader';
import { toast } from 'react-toastify';

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .max(30, 'Debe tener una longitud de 30 caracteres')
    .required('Este campo es requerido.'),
  password: yup
    .string()
    .max(30, 'Debe tener una longitud de 30 caracteres')
    .required('Este campo es requerido.')
});

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit = async data => {
    try {
      const userData = await login(data).unwrap();
      dispatch(setCredentials({ ...userData }));
      reset();
      toast.success('Iniciaste sesión exitosamente');
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      if (error.status === 'FETCH_ERROR') {
        toast.error('Hubo un error a la hora de conectarse con el servidor.');
      }
      if (error.response.data.errors.errors) {
        toast.error(error.response.data.errors.errors);
      }
    }
  };

  return (
    <Flex direction="column" className="gap-2 p-2 px-2">
      <Flex
        alignItems="center"
        direction="column"
        className="text-center text-primary"
      >
        <h1>
          <BsGearFill />
        </h1>
        <h4>
          <strong>Sistema</strong>
        </h4>
      </Flex>
      <Form
        className="d-flex flex-column gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group controlId="username">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Usuario"
            {...register('username')}
          />
          {errors.username && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.username.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.password.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Flex className="mt-3">
          <BtnLoader
            className="w-100"
            variant="primary"
            type="submit"
            title="Iniciar"
            disabled={!isDirty}
            loading={isLoading}
          >
            Ingresar
          </BtnLoader>
        </Flex>
      </Form>
    </Flex>
  );
}
