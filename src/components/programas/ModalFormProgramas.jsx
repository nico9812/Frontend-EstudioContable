import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
import { Button } from '../ui/button';
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
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';

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

  const { userId, programaId } = useParams();

  const form = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      nombre: '',
      resolucion: '',
      localidad: '',
      fecha_inicio: '',
      fecha_final: '',
      dias: '',
      profesional: '',
      estado: ''
    }
  });

  const { programa, isLoading } = useGetProgramasQuery(userId, {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      programa: data?.entities[programaId],
      isLoading,
      isSuccess
    })
  });

  const [addNewPrograma] = useAddNewProgramaMutation();
  const [updatePrograma] = useUpdateProgramaMutation();

  useEffect(() => {
    if (isEditPage && programa) {
      form.setValue('nombre', programa.nombre);
      form.setValue('resolucion', programa.resolucion);
      form.setValue('localidad', programa.localidad);
      form.setValue('fecha_inicio', programa.fecha_inicio);
      form.setValue('fecha_final', programa.fecha_final);
      form.setValue('dias', programa.dias);
      form.setValue('profesional', programa.profesional);
      form.setValue('estado', programa.estado);
    }
  }, [isEditPage, programa, form]);

  const titulo = isEditPage ? 'Edición de Programa' : 'Registrar Programa';

  const onSubmit = async data => {
    if (!isEditPage) {
      try {
        await addNewPrograma({ ...data, usuario: userId }).unwrap();
        form.reset();
        navigateBack();
        toast.success('El cliente fue creado exitosamente.');
      } catch (err) {
        navigateBack();
        toast.error('Hubo un error a la hora crear el Usuario.');
      }
    } else {
      try {
        await updatePrograma({
          data,
          programaId
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
        <DialogTitle>{titulo}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="nombre"
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
            name="resolucion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resolucion</FormLabel>
                <FormControl>
                  <Input placeholder="Resolucion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="localidad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localidad</FormLabel>
                <FormControl>
                  <Input placeholder="Localidad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fecha_inicio"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Inicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', {
                            locale: es
                          })
                        ) : (
                          <span>Selecciona una Fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={es}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fecha_final"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Finalización</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', {
                            locale: es
                          })
                        ) : (
                          <span>Selecciona una Fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={es}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dias"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Días</FormLabel>
                <FormControl>
                  <Input placeholder="Días" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profesional"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profesional</FormLabel>
                <FormControl>
                  <Input placeholder="Profesional" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input placeholder="Estado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter className="sm:justify-between">
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>
        <div className="flex flex-row gap-4">
          <Button onClick={form.handleSubmit(onSubmit)}>Guardar</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

ModalFormProgramas.propTypes = {
  location: PropTypes.object,
  navigateBack: PropTypes.func
};

export default ModalFormProgramas;
