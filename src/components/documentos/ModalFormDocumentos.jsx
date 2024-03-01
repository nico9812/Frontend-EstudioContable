import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Form, CloseButton, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useGetCategoriasQuery } from '@/redux/api/categoriasApiSlice';
import { useAddNewDocumentoMutation } from '@/redux/api/documentosApiSlice';
import { QueryHooks } from '@/hooks/QueryHooks';

const yupSchema = yup.object().shape({
  archivo: yup
    .mixed()
    .test('fileType', 'Solo se permiten archivos PDF', value => {
      return value && value[0] && value[0].type === 'application/pdf';
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

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm({
    resolver: yupResolver(yupSchema)
  });

  const [addNewDocumento] = useAddNewDocumentoMutation();

  const titulo = 'Registrar Documento';

  const onSubmit = async data => {
    try {
      await addNewDocumento({ ...data, propietario: userId }).unwrap();
      reset();
      navigateBack();
      toast.success('El cliente fue creado exitosamente.');
    } catch (err) {
      navigateBack();
      toast.error('Hubo un error a la hora de crear el Documento.');
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{titulo}</Modal.Title>
        <CloseButton
          className="btn btn-circle btn-sm transition-base p-0"
          onClick={navigateBack}
        />
      </Modal.Header>
      <Modal.Body>
        <Form autoComplete="off" className="d-flex flex-column gap-3 my-3 mx-4">
          <Form.Group controlId="archivo">
            <Form.Label>Archivo</Form.Label>
            <Form.Control
              autoComplete="off"
              type="file"
              placeholder="Ingrese el Correo"
              accept=".pdf"
              {...register('archivo')}
            />
            {errors.archivo && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.archivo.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="categoria">
            <Form.Label>Categoria</Form.Label>
            <QueryHooks
              useQuery={useGetCategoriasQuery()}
              childrenObjects={renderArray => ({
                categorias: renderArray
              })}
            >
              {({ categorias }) => {
                return (
                  <Form.Select {...register('categoria')}>
                    <option value="">Selecciona...</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </Form.Select>
                );
              }}
            </QueryHooks>
            {errors.categoria && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.categoria.message}
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

ModalFormDocumentos.propTypes = {
  location: PropTypes.object,
  navigateBack: PropTypes.func
};

export default ModalFormDocumentos;
