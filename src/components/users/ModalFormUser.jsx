import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

  const form = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: !isEditPage
      ? {
          email: '',
          username: ''
        }
      : {
          email: '',
          username: '',
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

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

          {(!isEditPage || passwordChange) && (
            <>
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

              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Contraseña</FormLabel>
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
            </>
          )}
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
