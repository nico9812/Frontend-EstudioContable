import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { LoadingIndicator } from '../common/LoadingIndicator';
import {
  useAddNewCategoriaMutation,
  useGetCategoriasQuery,
  useUpdateCategoriaMutation
} from '@/redux/api/categoriasApiSlice';
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
import { Button } from '../ui/button';

const yupSchema = yup.object().shape({
  nombre: yup.string().required('Este campo es requerido.')
});

const ModalFormCategorias = ({ location, navigateBack }) => {
  const isEditPage = location.pathname.includes('edit');

  const { categoriaId } = useParams();

  const form = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      nombre: ''
    }
  });

  const { categoria, isLoading } = useGetCategoriasQuery('getUsers', {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      categoria: data?.entities[categoriaId],
      isLoading,
      isSuccess
    })
  });

  const [addNewCategoria] = useAddNewCategoriaMutation();
  const [updateCategoria] = useUpdateCategoriaMutation();

  useEffect(() => {
    if (isEditPage && categoria) {
      form.setValue('nombre', categoria.nombre);
    }
  }, [isEditPage, categoria, form]);

  const titulo = isEditPage ? 'Edición de Categoria' : 'Registrar Categoria';

  const onSubmit = async data => {
    if (!isEditPage) {
      try {
        await addNewCategoria(data).unwrap();
        form.reset();
        navigateBack();
        toast.success('El cliente fue creado exitosamente.');
      } catch (err) {
        navigateBack();
        toast.error('Hubo un error a la hora crear el Usuario.');
      }
    } else {
      try {
        await updateCategoria({
          data,
          categoriaId
        }).unwrap();
        form.reset();
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
    <DialogContent closeAction={navigateBack}>
      <DialogHeader>
        <DialogTitle id="contained-modal-title-vcenter">{titulo}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="nombre"
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
        </form>
      </Form>
      <DialogFooter>
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>
        <div className="flex flex-row gap-4">
          {/* {isEditPage && (
            <Button variant="destructive" onClick={onBorrarClick}>
              Borrar
            </Button>
          )} */}
          <Button onClick={form.handleSubmit(onSubmit)}>Guardar</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

ModalFormCategorias.propTypes = {
  location: PropTypes.object,
  navigateBack: PropTypes.func
};

export default ModalFormCategorias;
