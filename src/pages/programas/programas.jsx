
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { UsPro } from '../../hooks/listarProgramas';
import { TableGen } from '../../components/table';

import { Link} from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { GuardarProgramas,EditarProgramas, DeletePrograma, BuscarPro } from '../../Api/Programas';
import { useRef } from 'react';

export function ListarProgramasConta(){
    const { id } = useParams();
    const programas = UsPro(id)
    const { register, handleSubmit, errors, reset, setValue } = useForm();
    const [errorForm, setErrorForm] = useState({});
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalAbiertoMod, setModalAbiertoMod] = useState(false);
    const [confirmarEliminarMod, setConfirmarEliminarMod] = useState(false);
    const [programaSelected, setProgramaSelected] = useState(null); 
    const searchRef = useRef(null); 

    const cabecera = ['nombre', 'resolucion', 'localidad', 'fecha_inicio', 'fecha_final', 'dias', 'profesional', 'estado'];


    // Agregar Programa
  const onSubmit = handleSubmit(async data =>{
    data.usuario = id;
    setErrorForm({});
    try {
      const response = await GuardarProgramas(data);
      if (response.status == 401) {
        Cookies.remove('token');
      }
      if (response.status === 201) {
        programas.actualizarProgramas();
        cerrarModal();
        reset();
        searchRef.current.value = "";
      }
    }catch (error) {
      console.log(error)
        if (error.response) {
            setErrorForm(error.response.data.errors || {});
            // Aquí puedes manejar los errores, mostrar mensajes, etc.
        }
    }
  })


  const abrirModal = () => {
    setModalAbierto(true);
    cerrarModalMod();
    cerrarConfirm();
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    reset();
  };

  // Editar Programa
  const onSubmitMod = handleSubmit(async data =>{
    data.usuario = id;
    setErrorForm({});
    try {
      const response = await EditarProgramas(programaSelected.id,data);
      if (response.status == 401) {
        Cookies.remove('token');
      }
      if (response.status === 200) {
        programas.actualizarProgramas();
        setProgramaSelected(null);
        cerrarModalMod();
        reset();
        searchRef.current.value = "";
      }
    }catch (error) {
      console.log(error)
        if (error.response) {
            setErrorForm(error.response.data.errors || {});
            // Aquí puedes manejar los errores, mostrar mensajes, etc.
        }
    }
  })
  const abrirModalMod = (user) => {
    setProgramaSelected(user)
    setValue('nombre', user.nombre);
    setValue('resolucion', user.resolucion);
    setValue('localidad', user.localidad);
    setValue('fecha_inicio', user.fecha_inicio);
    setValue('fecha_final', user.fecha_final);
    setValue('dias', user.dias);
    setValue('profesional', user.profesional);
    setValue('estado', user.estado);
    setModalAbiertoMod(true);
    setModalAbierto(false);
    cerrarConfirm();
  };

  const cerrarModalMod = () => {
    setModalAbiertoMod(false);
    reset();
  };

  // eliminar programa 

  const abrirConfirm = (user) => {
    setProgramaSelected(user);
    setConfirmarEliminarMod(true);
    cerrarModal();
    setModalAbiertoMod(false);
  };

  const cerrarConfirm = () => {
    setConfirmarEliminarMod(false);
  };

  const handleDeleteVen = async (id) => {
      
    if (id){
      try {
          const response = await DeletePrograma(id);
          if (response.status == 401) {
            Cookies.remove('token');
          }
          setProgramaSelected(null);
          if (response.status == 204) {
            programas.actualizarProgramas();
            cerrarConfirm();
            cerrarModalMod();
            searchRef.current.value = "";
          }
      } catch (error) {
        console.log(error)
          if (error.response.data.errors) {
              setErrorForm(error.response.data.errors || {});
          }
      }
    };
  };

  const handleSearch = async (event) => {
    let search = event.target.value;
    if(search != ''){
      setErrorForm({});
      try {
        programas.buscarProgramas(search);
      } catch (error) {
        if (error.response.data.errors) {
          setErrorForm(error.response.data.errors || {});
          // Aquí puedes manejar los errores, mostrar mensajes, etc.
        }
      }
    }
    else{
      programas.actualizarProgramas();
    }
  };



    return (

      <div className='body'>
        <div className='contentbot d-flex justify-content-between'>
          <span className='nuevodoc'>
            <Button variant="primary" onClick={abrirModal} >Nuevo Programa</Button>
          </span>
          <Form.Control
            placeholder="Buscar"
            aria-label="Buscador"
            aria-describedby="basic-addon2"
            required
            onChange={handleSearch}
            ref={searchRef}
          />
          <span className='volver'>
            <Button as={Link} to="../" variant="secondary">
              Volver         
            </Button>
          </span>
        </div>

        <div className='contenedores'>
          {TableGen(cabecera,programas,"programas", {abrirConfirm},{abrirModalMod},"")}
        </div>

      <Modal
          isOpen={modalAbierto}
          onRequestClose={cerrarModal}
          contentLabel="Guardar"
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Form.Group controlId="formPlaintextnombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control size='lg' type='text' placeholder="Nombre del Programa" {...register("nombre", { required: true })} />
                {errorForm.nombre && <span>{errorForm.nombre.message}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPlaintextresolucion">
                <Form.Label>Resolución</Form.Label>
                <Form.Control size='lg' type='text' placeholder="Resolución" {...register("resolucion")} />
                {errorForm.resolucion && <span>{errorForm.resolucion.message}</span>}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formPlaintextlocalidad">
                <Form.Label>Localidad</Form.Label>
                <Form.Control size='lg' type='text' placeholder="Localidad" {...register("localidad")} />
                {errorForm.localidad && <span>{errorForm.localidad.message}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPlaintextfechaInicio">
                <Form.Label>Fecha de Inicio</Form.Label>
                <Form.Control size='lg' type='date' {...register("fecha_inicio")} />
                {errorForm.fechaInicio && <span>{errorForm.fechaInicio.message}</span>}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formPlaintextfechaFinal">
                <Form.Label>Fecha Final</Form.Label>
                <Form.Control size='lg' type='date' {...register("fecha_final")} />
                {errorForm.fechaFinal && <span>{errorForm.fechaFinal.message}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPlaintextdias">
                <Form.Label>Días</Form.Label>
                <Form.Control size='lg' type='number' {...register("dias")} />
                {errorForm.dias && <span>{errorForm.dias.message}</span>}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formPlaintextprofesional">
                <Form.Label>Profesional</Form.Label>
                <Form.Control size='lg' type='text' placeholder="Profesional" {...register("profesional")} />
                {errorForm.profesional && <span>{errorForm.profesional.message}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPlaintextestado">
                <Form.Label>Estado</Form.Label>
                <Form.Control size='lg' type='text' placeholder="Estado" {...register("estado")} />
                {errorForm.estado && <span>{errorForm.estado.message}</span>}
              </Form.Group>
            </Col>
          </Row>
          <div className='d-flex justify-content-between mt-5'>
          <Button variant="primary" type="submit" className='ml-5'>
            Guardar
          </Button>
          <Button variant="secondary" onClick={cerrarModal} className='mr-5'>
            Cancelar
          </Button>
          </div>
        </Form>
        
      </Modal>

      {/* modal editar  */}

      <Modal
          isOpen={modalAbiertoMod}
          onRequestClose={cerrarModalMod}
          contentLabel="Editar"
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
        <Form onSubmit={handleSubmit(onSubmitMod)}>
          <Row>
            <Col>
              <Form.Group controlId="formPlaintextnombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control size='lg' type='text' placeholder="Nombre del Programa" {...register("nombre", { required: true })} />
                {errorForm.nombre && <span>{errorForm.nombre.message}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPlaintextresolucion">
                <Form.Label>Resolución</Form.Label>
                <Form.Control size='lg' type='text' placeholder="Resolución" {...register("resolucion")} />
                {errorForm.resolucion && <span>{errorForm.resolucion.message}</span>}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formPlaintextlocalidad">
                <Form.Label>Localidad</Form.Label>
                <Form.Control size='lg' type='text' placeholder="Localidad" {...register("localidad")} />
                {errorForm.localidad && <span>{errorForm.localidad.message}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPlaintextfechaInicio">
                <Form.Label>Fecha de Inicio</Form.Label>
                <Form.Control size='lg' type='date' {...register("fecha_inicio")} />
                {errorForm.fechaInicio && <span>{errorForm.fechaInicio.message}</span>}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formPlaintextfechaFinal">
                <Form.Label>Fecha Final</Form.Label>
                <Form.Control size='lg' type='date' {...register("fecha_final")} />
                {errorForm.fechaFinal && <span>{errorForm.fechaFinal.message}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPlaintextdias">
                <Form.Label>Días</Form.Label>
                <Form.Control size='lg' type='number' {...register("dias")} />
                {errorForm.dias && <span>{errorForm.dias.message}</span>}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formPlaintextprofesional">
                <Form.Label>Profesional</Form.Label>
                <Form.Control size='lg' type='text' placeholder="Profesional" {...register("profesional")} />
                {errorForm.profesional && <span>{errorForm.profesional.message}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPlaintextestado">
                <Form.Label>Estado</Form.Label>
                <Form.Control size='lg' type='text' placeholder="Estado" {...register("estado")} />
                {errorForm.estado && <span>{errorForm.estado.message}</span>}
              </Form.Group>
            </Col>
          </Row>
          <div className='d-flex justify-content-between mt-5'>
          <Button variant="primary" type="submit" className='ml-5'>
            Guardar
          </Button>
          <Button variant="secondary" onClick={cerrarModalMod} className='mr-5'>
            Cancelar
          </Button>
          </div>
        </Form>
        
      </Modal>

      {/* editar modal  */}

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
          <p>¿Estás seguro que deseas borrar programa {programaSelected !== null && (programaSelected.nombre)} ?</p>
          <div className='d-flex justify-content-between'>
          <Button variant="danger" onClick={() => handleDeleteVen(programaSelected.id)}>Eliminar</Button>
          <Button variant="secondary" onClick={cerrarConfirm}>Cancelar</Button>
          </div>
      </Modal>




      </div>
      );
  }





export function ListarProgramasClien(){
    const id = Cookies.get('id');
    const programas = UsPro(id)
    const cabecera = ['nombre', 'resolucion', 'localidad', 'fecha_inicio', 'fecha_final', 'dias', 'profesional', 'estado'];

    return (
      <div className='body'>
        <div className='contenedores'>
          {programas.programas.length > 0 &&
              TableGen(cabecera,programas,"programas",'','','')
          }
        </div>
        
      </div>
      );
  }