import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { UsDoc } from '../../hooks/listarDocumentos';
import { CardDoc, CardDocCli } from './cardDoc';
import Modal from 'react-modal';
import React, { useState } from 'react';
import { DeleteDoc, GuardarDocumento } from '../../Api/DocumentosApi';
import { useForm } from 'react-hook-form';
import { UsCat } from '../../hooks/listarCategorias';
import FormData from 'form-data';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useRef } from 'react';

export function ListarDocumentosConta() {
  const { id } = useParams();
  const [confirmarEliminarMod, setConfirmarEliminarMod] = useState(false);
  const [documentoAEliminar, setDocumentoAEliminar] = useState(null);
  const documentos = UsDoc(id);
  const [modalAbierto, setModalAbierto] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const categorias = UsCat();
  const [errorForm, setErrorForm] = useState({});

  const selectRef = useRef(null);

  const abrirConfirm = (event, doc) => {
    event.preventDefault();
    setDocumentoAEliminar(doc);
    setConfirmarEliminarMod(true);
  };

  const cerrarConfirm = () => {
    setConfirmarEliminarMod(false);
    setDocumentoAEliminar(null);
  };

  const handleRightClick = async () => {
    try {
      const response = await DeleteDoc(documentoAEliminar.id);
      if (response.status == 401) {
        Cookies.remove('token');
      }
      if (response.status == 204) {
        setDocumentoAEliminar(null);
        documentos.actualizarDocumentos();
        cerrarConfirm();
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.errors) {
        setErrorForm(error.response.data.errors || {});
      }
    }
  };

  // Agregar Documento

  const onSubmit = handleSubmit(async data => {
    const formData = new FormData();
    formData.append('nombre', data.archivo[0].name);
    formData.append('archivo', data.archivo[0]);
    formData.append('propietario', id);
    formData.append('categoria', data.categoria);
    setErrorForm({});
    try {
      const response = await GuardarDocumento(formData);
      if (response.status == 401) {
        Cookies.remove('token');
      }
      if (response.status === 201) {
        documentos.actualizarDocumentos();
        cerrarModal();
        reset();
        selectRef.current.value = 'todas';
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setErrorForm(error.response.data.errors || {});
        // Aquí puedes manejar los errores, mostrar mensajes, etc.
      }
    }
  });

  const abrirModal = () => {
    setModalAbierto(true);
    reset();
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    reset();
  };

  // filtro categoria

  const handleFiltro = async data => {
    let categoria = data.target.value;
    if (categoria != '') {
      setErrorForm({});
      try {
        documentos.filtrarDocumentos(categoria, id);
      } catch (error) {
        if (error.response.data.errors) {
          setErrorForm(error.response.data.errors || {});
          // Aquí puedes manejar los errores, mostrar mensajes, etc.
        }
      }
    } else {
      users.actualizarUsuarios();
    }
  };

  return (
    <div className="conten">
      <div className="contentbot d-flex justify-content-between">
        <span className="nuevodoc">
          <Button variant="primary" onClick={abrirModal}>
            Nuevo Documento
          </Button>
          <Button as={Link} to="categorias/" variant="primary">
            Agregar Categoria
          </Button>
        </span>
        <Form.Select
          ref={selectRef}
          className="selectFiltro"
          onChange={handleFiltro}
        >
          <option value="todas">Todos</option>
          {categorias.categorias.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </Form.Select>
      </div>
      <div className="contenedor">
        {documentos.documentos.length > 0 ? (
          documentos.documentos.map(doc => (
            <div key={doc.id} onContextMenu={event => abrirConfirm(event, doc)}>
              <CardDoc key={doc.id} documento={doc} />
            </div>
          ))
        ) : (
          <div>No hay documentos</div>
        )}
        <Modal
          isOpen={confirmarEliminarMod}
          onRequestClose={cerrarConfirm}
          contentLabel="Confirmación"
          className="mi-modal"
          overlayClassName="mi-overlay"
          style={{
            overlay: {
              zIndex: 1001 // ajusta este valor según sea necesario
            },
            content: {
              zIndex: 1002 // ajusta este valor según sea necesario
            }
          }}
        >
          <p>
            ¿Estás seguro que deseas borrar el archivo{' '}
            {documentoAEliminar !== null && documentoAEliminar.nombre}?
          </p>
          <button onClick={() => handleRightClick()}>Aceptar</button>
          <button onClick={cerrarConfirm}>Cancelar</button>
        </Modal>

        <Modal
          isOpen={modalAbierto}
          onRequestClose={cerrarModal}
          contentLabel="Confirmación"
          className="mi-modal"
          overlayClassName="mi-overlay"
          style={{
            overlay: {
              zIndex: 1000 // ajusta este valor según sea necesario
            },
            content: {
              zIndex: 1001 // ajusta este valor según sea necesario
            }
          }}
        >
          <form onSubmit={onSubmit} className="form login">
            <h2>Nuevo</h2>
            <input
              type="file"
              name="archivo"
              {...register('archivo', { required: true })}
            />
            <select
              name="categoria"
              id=""
              {...register('categoria', { required: true })}
            >
              {categorias.categorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
            <input type="submit" value="Guardar" />
          </form>
          <button onClick={cerrarModal}>Cancelar</button>
        </Modal>
      </div>
    </div>
  );
}

export function ListarDocumentosclien() {
  const id = Cookies.get('id');
  const documentos = UsDoc(id);
  const categorias = UsCat();
  const [errorForm, setErrorForm] = useState({});

  const handleFiltro = async event => {
    let categoria = event.target.value;
    if (categoria != '') {
      setErrorForm({});
      try {
        documentos.filtrarDocumentos(categoria, id);
      } catch (error) {
        if (error.response.data.errors) {
          setErrorForm(error.response.data.errors || {});
          // Aquí puedes manejar los errores, mostrar mensajes, etc.
        }
      }
    } else {
      users.actualizarUsuarios();
    }
  };

  return (
    <div className="conten">
      <div className="d-flex justify-content-center mt-5">
        <Form.Select className="selectFiltro" onChange={handleFiltro}>
          <option value="todas">Todos</option>
          {categorias.categorias.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </Form.Select>
      </div>

      <div className="contenedor">
        {documentos.documentos.length > 0 ? (
          documentos.documentos.map(doc => (
            <CardDocCli key={doc.id} documento={doc} />
          ))
        ) : (
          <div>No hay documentos</div>
        )}
      </div>
    </div>
  );
}
