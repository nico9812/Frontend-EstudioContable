import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Form, CloseButton, Button, Modal } from 'react-bootstrap';
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

const yupSchema = yup.object().shape({
  nombre: yup.string().required('Este campo es requerido.')
});

const ModalFormCategorias = ({ location, navigateBack }) => {
  const isEditPage = location.pathname.includes('edit');

  const { categoriaId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(yupSchema)
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
      setValue('nombre', categoria.nombre);
    }
  }, [isEditPage, categoria, setValue]);

  const titulo = isEditPage ? 'Edición de Categoria' : 'Registrar Categoria';

  const onSubmit = async data => {
    if (!isEditPage) {
      try {
        await addNewCategoria(data).unwrap();
        reset();
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
        reset();
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
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{titulo}</Modal.Title>
        <CloseButton
          className="btn btn-circle btn-sm transition-base p-0"
          onClick={navigateBack}
        />
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="d-flex flex-column gap-3 my-3 mx-4"
        >
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Ingrese el nombre de Categoria"
              {...register('nombre')}
            />
            {errors.nombre && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.nombre.message}
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

ModalFormCategorias.propTypes = {
  location: PropTypes.object,
  navigateBack: PropTypes.func
};

export default ModalFormCategorias;
