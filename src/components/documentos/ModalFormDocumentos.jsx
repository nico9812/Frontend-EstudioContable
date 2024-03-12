import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useGetCategoriasQuery } from '@/redux/api/categoriasApiSlice';
import { useAddNewDocumentoMutation } from '@/redux/api/documentosApiSlice';
import { QueryHooks } from '@/hooks/QueryHooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import ButtonAction from '../common/ButtonAction';

const yupSchema = yup.object().shape({
  archivo: yup
    .mixed()
    .test('fileType', 'Solo se permiten archivos PDF', value => {
      return value.type === 'application/pdf';
    }),
  categoria: yup
    .string()
    .max(30, 'Debe tener una longitud de 30 caracteres')
    .required('Este campo es requerido.')
});

const ModalFormDocumentos = ({ navigateBack }) => {
  const { userId } = useParams();
  // const isEditPage = location.pathname.includes('edit');s
  // const titulo = isEditPage ? 'Edición de Cliente' : 'Registrar Documento';

  const form = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      archivo: '',
      categoria: ''
    }
  });

  const [addNewDocumento, isLoading] = useAddNewDocumentoMutation();

  const titulo = 'Registrar Documento';

  const onSubmit = async data => {
    try {
      await addNewDocumento({ ...data, propietario: userId }).unwrap();
      form.reset();
      navigateBack();
      toast.success('El cliente fue creado exitosamente.');
    } catch (err) {
      navigateBack();
      toast.error('Hubo un error a la hora de crear el Documento.');
    }
  };

  return (
    <DialogContent closeAction={navigateBack}>
      <DialogHeader>
        <DialogTitle>{titulo}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="archivo"
            // eslint-disable-next-line no-unused-vars
            render={({ field: { value, onChange, ...fieldProps } }) => {
              return (
                <FormItem>
                  <FormLabel>Archivo</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      placeholder="Selecione un archivo..."
                      type="file"
                      accept="application/pdf"
                      onChange={event =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <QueryHooks
            useQuery={useGetCategoriasQuery()}
            childrenObjects={renderArray => ({
              categorias: renderArray
            })}
          >
            {({ categorias }) => {
              return (
                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormLabel>Categorias</FormLabel>
                      <Select
                        onValueChange={onChange}
                        defaultValue={value}
                        value={value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una Categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categorias.map(cat => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                              {cat.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }}
          </QueryHooks>
        </form>
      </Form>
      <DialogFooter className="sm:justify-between">
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>
        <div className="flex flex-row gap-4">
          <ButtonAction
            loading={!isLoading}
            accion={form.handleSubmit(onSubmit)}
            title={'Guardar'}
          />
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

ModalFormDocumentos.propTypes = {
  location: PropTypes.object,
  navigateBack: PropTypes.func
};

export default ModalFormDocumentos;
