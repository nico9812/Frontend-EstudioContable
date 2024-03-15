import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import YupPassword from 'yup-password';

import { useForm } from 'react-hook-form';
import {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation
} from '@/redux/api/usersApiSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import ButtonAction from '../common/ButtonAction';
import { Asterisco } from '../common/Asterisco';

YupPassword(yup);
const addOrEditPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Debe ser un correo valido')
    .required('Este campo es requerido.'),
  username: yup
    .string()
    .max(60, 'Debe tener una longitud máxima de 60 caracteres')
    .required('Este campo es requerido.'),
  password: yup
    .string()
    .min(8, 'Debe tener una longitud minima de 8 caracteres')
    .minUppercase(1, 'Minimo un caracter en mayuscula')
    .minLowercase(1, 'Minimo un caracter en minuscula')
    .minNumbers(1, 'Minimo un numero')
    .minSymbols(1, 'Minimo un simbolo')
    .max(60, 'Debe tener una longitud máxima de 60 caracteres')
    .required('Este campo es requerido.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Este campo es requerido.'),
  first_name: yup
    .string()
    .max(60, 'Debe tener una longitud máxima de 60 caracteres'),
  last_name: yup
    .string()
    .max(60, 'Debe tener una longitud máxima de 60 caracteres'),
  empresa: yup
    .string()
    .max(60, 'Debe tener una longitud máxima de 60 caracteres')
});

const editSchema = yup.object().shape({
  email: yup
    .string()
    .email('Debe ser un correo valido')
    .required('Este campo es requerido.'),
  username: yup
    .string()
    .max(60, 'Debe tener una longitud máxima de 60 caracteres')
    .required('Este campo es requerido.'),
  first_name: yup
    .string()
    .max(60, 'Debe tener una longitud máxima de 60 caracteres'),
  last_name: yup
    .string()
    .max(60, 'Debe tener una longitud máxima de 60 caracteres'),
  empresa: yup
    .string()
    .max(60, 'Debe tener una longitud máxima de 60 caracteres')
});

const ModalFormUser = ({ location, navigateBack, navigate }) => {
  const [passwordChange, setPasswordChange] = useState(false);
  const isEditPage = location.pathname.includes('edit');
  const { userId } = useParams();

  const yupSchema =
    !passwordChange && isEditPage ? editSchema : addOrEditPasswordSchema;

  const form = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: !isEditPage
      ? {
          email: '',
          username: '',
          empresa: '',
          first_name: '',
          last_name: ''
        }
      : {
          email: '',
          username: '',
          empresa: '',
          first_name: '',
          last_name: '',
          password: '',
          confirmPassword: ''
        }
  });

  const { user } = useGetUsersQuery('getUsers', {
    selectFromResult: ({ data, isSuccess }) => ({
      user: data?.entities[userId],

      isSuccess
    })
  });

  const [addNewUser, { isLoading: isLoadingNew }] = useAddNewUserMutation();
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (isEditPage && user) {
      form.setValue('email', user.email);
      form.setValue('username', user.username);
      form.setValue('empresa', user.empresa);
      form.setValue('first_name', user.first_name);
      form.setValue('last_name', user.last_name);
      form.setValue('password', user.password);
    }
  }, [isEditPage, user, form]);

  const titulo = isEditPage ? 'Edición de Cliente' : 'Registrar Cliente';

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
        form.reset();
        navigateBack();
        toast.success('El cliente fue creado exitosamente.');
      } catch (err) {
        toast.error('Hubo un error a la hora crear el Usuario.');
      }
    } else {
      try {
        await updateUser({
          data,
          userId
        }).unwrap();
        form.reset();
        navigateBack();
        toast.success('El cliente fue editado exitosamente.');
      } catch (err) {
        toast.error('Hubo un error a la hora editar el Usuario.');
      }
    }
  };

  return (
    <DialogContent closeAction={navigateBack}>
      <DialogHeader>
        <DialogTitle>{titulo}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {isEditPage && (
            <div className="flex items-center gap-2">
              <Checkbox
                checked={passwordChange}
                onCheckedChange={setPasswordChange}
                id="passwordChange"
              />
              <FormLabel htmlFor="passwordChange">
                Habilitar cambio de contraseña.
              </FormLabel>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Usuario <Asterisco />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <Asterisco />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="empresa"
              render={({ field }) => (
                <FormItem className="col-span-2 text-center">
                  <FormLabel>Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {(!isEditPage || passwordChange) && (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Contraseña <Asterisco />
                    </FormLabel>
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

              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirmar Contraseña <Asterisco />
                    </FormLabel>
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
            </div>
          )}
          <div className="text-gray-500">
            <small>
              Los campos con un <Asterisco /> son obligatorios de completar.
            </small>
          </div>
        </form>
      </Form>
      <DialogFooter className="sm:justify-between">
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>
        <div className="flex flex-row gap-4">
          {isEditPage && (
            <Button variant="destructive" onClick={onBorrarClick}>
              Borrar
            </Button>
          )}
          <ButtonAction
            loading={!isEditPage ? isLoadingNew : isLoadingUpdate}
            accion={form.handleSubmit(onSubmit)}
            title={'Guardar'}
          />
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default ModalFormUser;
