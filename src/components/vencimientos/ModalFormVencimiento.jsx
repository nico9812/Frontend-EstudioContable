import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  useAddNewVencimientoMutation,
  useGetVencimientosQuery,
  useUpdateVencimientoMutation
} from '@/redux/api/vencimientosApiSlice';
import { format } from 'date-fns';
import parse from 'date-fns/parse';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingIndicator } from '../common/LoadingIndicator';
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
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Switch } from '../ui/switch';
import { Asterisco } from '../common/Asterisco';

const addOrEditPasswordSchema = yup.object().shape({
  nombre: yup
    .string()
    .max(60, 'Debe tener una longitud máxima de 60 caracteres')
    .required('Este campo es requerido.'),
  fecha: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, 'dd.MM.yyyy', new Date());
      return result;
    })
    .typeError('Porfavor, ingrese una Fecha Valida')
    .required()
    .min('1969-11-13', 'La fecha es muy temprana'),
  alarma: yup.bool().transform((value, originalValue) => {
    if (value === '') {
      return false;
    }
    return originalValue;
  })
});

const ModalFormVencimiento = ({ location, navigateBack, navigate }) => {
  const { userId, vencimientoId } = useParams();
  const isEditPage = location.pathname.includes('edit');

  const { vencimientos: vencimiento, isLoading } = useGetVencimientosQuery(
    userId,
    {
      selectFromResult: ({ data, isLoading, isSuccess }) => {
        return {
          vencimientos: data?.entities[vencimientoId],
          isLoading,
          isSuccess
        };
      }
    }
  );

  const [addNewVencimiento] = useAddNewVencimientoMutation();
  const [updateVencimiento] = useUpdateVencimientoMutation();

  const form = useForm({
    resolver: yupResolver(addOrEditPasswordSchema),
    defaultValues: {
      nombre: '',
      fecha: '',
      alarma: ''
    }
  });

  useEffect(() => {
    if (isEditPage && vencimiento) {
      const parsedDate = parse(vencimiento.fecha, 'yyyy-MM-dd', new Date());

      form.setValue('nombre', vencimiento.nombre);
      form.setValue('fecha', parsedDate);
      form.setValue('alarma', vencimiento.alarma);
    }
  }, [isEditPage, vencimiento, form]);

  const titulo = isEditPage
    ? 'Edición de Vencimiento'
    : 'Registrar Vencimiento';

  const onBorrarClick = () => {
    return navigate(
      `/dashboard/contador/vencimientos/${userId}/borrar/${vencimientoId}`,
      {
        state: {
          backgroundLocation: location.state.backgroundLocation
        }
      }
    );
  };

  const onSubmit = async data => {
    if (!isEditPage) {
      try {
        await addNewVencimiento({ ...data, propietario: userId }).unwrap();
        form.reset();
        navigateBack();
        toast.success('El Vencimiento fue creado exitosamente.');
      } catch (err) {
        toast.error('Hubo un error a la hora crear el Vencimiento.');
      }
    } else {
      try {
        await updateVencimiento({
          data: { ...data, propietario: userId },
          vencimientoId
        }).unwrap();
        form.reset();
        navigateBack();
        toast.success('El cliente fue editado exitosamente.');
      } catch (err) {
        toast.error('Hubo un error a la hora editar el Vencimiento.');
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
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nombre de Vencimiento <Asterisco />
              </FormLabel>
              <FormControl>
                <Input placeholder="Nombre de Vencimiento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fecha"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Fecha de Vencimiento <Asterisco />
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
          name="alarma"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>¿Activar Alarma?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alarma"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>¿Es un Vencimiento Anual?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-gray-500">
          <small>
            Los campos con un <Asterisco /> son obligatorios de completar.
          </small>
        </div>
      </Form>
      <DialogFooter className="flex-row sm:justify-between justify-between">
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>
        <div className="flex flex-row gap-4">
          {isEditPage && (
            <Button variant="destructive" onClick={onBorrarClick}>
              Borrar
            </Button>
          )}
          <Button onClick={form.handleSubmit(onSubmit)}>Guardar</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

ModalFormVencimiento.propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.any,
  navigateBack: PropTypes.func
};

export default ModalFormVencimiento;
