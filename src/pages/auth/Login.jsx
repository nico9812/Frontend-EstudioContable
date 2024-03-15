import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useLoginMutation } from '@/redux/api/authApiSlice';
import { setCredentials } from '@/redux/reducer/authReducerSlice';
import { useDispatch } from 'react-redux';

import ButtonAction from '@/components/common/ButtonAction';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .max(60, 'Debe tener una longitud máxima de 60 caracteres')
    .required('Este campo es requerido.'),
  password: yup
    .string()
    .max(60, 'Debe tener una longitud máxima de 60 caracteres')
    .required('Este campo es requerido.')
});

export function Login() {
  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit = async data => {
    try {
      const userData = await login(data).unwrap();
      dispatch(setCredentials({ ...userData }));
      form.reset();
      toast.success('Iniciaste sesión exitosamente');
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        toast.error(error.data.errors[0]);
      }
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">Inicio de Sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="Usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-100 justify-center">
              <ButtonAction
                className="w-full"
                title="Iniciar"
                loading={isLoading}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
