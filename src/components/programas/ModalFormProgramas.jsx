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
import ButtonAction from '../common/ButtonAction';
import { Asterisco } from '../common/Asterisco';

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

  const dateStart = form.watch('fecha_inicio');
  const dateEnd = form.watch('fecha_final');

  const { programa, isLoading } = useGetProgramasQuery(userId, {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      programa: data?.entities[programaId],
      isLoading,
      isSuccess
    })
  });

  const [addNewPrograma, { isLoading: isLoadingNew }] =
    useAddNewProgramaMutation();
  const [updatePrograma, { isLoading: isLoadingUpdate }] =
    useUpdateProgramaMutation();

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

  useEffect(() => {
    if (!isEditPage && dateStart && dateEnd) {
      const startDate = new Date(dateStart);
      const endDate = new Date(dateEnd);
      const differenceInDays = Math.floor(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
      );

      form.setValue('dias', differenceInDays);
    }
  }, [dateStart, dateEnd, form, isEditPage]);

  const titulo = isEditPage ? 'Edición de Programa' : 'Registrar Programa';

  const onSubmit = async data => {
    if (!isEditPage) {
      try {
        await addNewPrograma({ ...data, usuario: userId }).unwrap();
        form.reset();
        navigateBack();
        toast.success('El Programa fue creado exitosamente.');
      } catch (err) {
        navigateBack();
        toast.error('Hubo un error a la hora crear el Programa.');
      }
    } else {
      try {
        await updatePrograma({
          data,
          programaId
        }).unwrap();
        form.reset();
        navigateBack();
        toast.success('El Programa fue editado exitosamente.');
      } catch (err) {
        navigateBack();
        toast.error('Hubo un error a la hora editar el Programa.');
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
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre <Asterisco />
                  </FormLabel>
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
                  <FormLabel>
                    Resolucion <Asterisco />
                  </FormLabel>
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
                <FormItem className="col-span-2">
                  <FormLabel>
                    Localidad <Asterisco />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Localidad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fecha_inicio"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Fecha de Inicio <Asterisco />
                  </FormLabel>
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
                  <FormLabel>
                    Fecha de Finalización <Asterisco />
                  </FormLabel>
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
                <FormItem className="col-span-2">
                  <FormLabel>
                    Días <Asterisco />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Días" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="profesional"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Profesional <Asterisco />
                  </FormLabel>
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
                  <FormLabel>
                    Estado <Asterisco />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Estado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
        <ButtonAction
          loading={!isEditPage ? isLoadingNew : isLoadingUpdate}
          accion={form.handleSubmit(onSubmit)}
          title={'Guardar'}
        />
      </DialogFooter>
    </DialogContent>
  );
};

ModalFormProgramas.propTypes = {
  location: PropTypes.object,
  navigateBack: PropTypes.func
};

export default ModalFormProgramas;
