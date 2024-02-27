
import React, { useEffect, useState } from 'react';
import { DeleteUsuario, RegistrarUsuario, ModificarUsuario } from '../../Api/UsuariosApi';
import Cookies from 'js-cookie';
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { TableGen } from '../../components/table';
import { Button } from 'react-bootstrap';
import { Users } from '../../components/listarClientes';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { useRef } from 'react';

Modal.setAppElement('#root');

export function Clientes(){
  const users = Users();
  const { register, handleSubmit, errors, reset, setValue } = useForm();
  const [errorForm, setErrorForm] = useState({});
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAbiertoMod, setModalAbiertoMod] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [usuarioSelected, setUsuarioSelected] = useState(null); 
  const searchRef = useRef(null); 
  

  const cabecera =['Usuario', 'Email','Nombre','Apellido']

  // Agregar Usuario
  const onSubmit = handleSubmit(async data =>{
      setErrorForm({});
      try {
          const response = await RegistrarUsuario(data);
          if (response.status == 401) {
            Cookies.remove('token');
          }
          if (response.status === 201) {
              cerrarModal()
              users.actualizarUsuarios();
              searchRef.current.value = "";
          }
      } catch (error) {
          if (error.response.data.errors) {
              setErrorForm(error.response.data.errors || {});
          }
      }
  })


  const abrirModal = () => {
    setModalAbierto(true);
    setModalAbiertoMod(false);
    setModalConfirm(false);
    reset()
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    reset();
  };

  // Editar Usuario
  const onSubmitMod = handleSubmit(async data =>{
    if(!data.password){
      delete data.password
      delete data.passwordConfirm
    }
    setErrorForm({});
    try {
      const response = await ModificarUsuario(usuarioSelected.id,data);
      if (response.status == 401) {
        Cookies.remove('token');
      }
      if (response.status === 200) {
        users.actualizarUsuarios();
        setUsuarioSelected(null);
        cerrarModalMod();
        reset();
        searchRef.current.value = "";
      }
    }catch (error) {
      console.log(error)
      if (error.response.data.errors) {
        setErrorForm(error.response.data.errors || {});
            // Aquí puedes manejar los errores, mostrar mensajes, etc.
        }
    }
  })


  const abrirModalMod = (user) => {
    cerrarModal();
    setUsuarioSelected(user)
    setValue('email', user.email);
    setValue('username', user.username);
    setModalAbiertoMod(true);
  };

  const cerrarModalMod = () => {
    setModalAbiertoMod(false);
    reset();
  };


  const handleDeleteUser = async (id) => {
      
    if (id){
      try {
          const response = await DeleteUsuario(id);
          if (response.status == 401) {
            Cookies.remove('token');
          }
          if (response.status == 204) {
            cerrarConfirm();
            users.actualizarUsuarios();
            setUsuarioSelected(null);
            searchRef.current.value = "";
          }
      } catch (error) {
          if (error.response.data.errors) {
              setErrorForm(error.response.data.errors || {});
          }
      }
    };
  };

  const abrirConfirm = () => {
    setModalConfirm(true);
    cerrarModalMod();
  };

  const cerrarConfirm = () => {
    setModalConfirm(false);
    setUsuarioSelected(null);
  };

  const handleSearch = async (event) => {
    let search = event.target.value;
    if(search != ''){
      setErrorForm({});
      try {
        users.buscarUsuarios(search);
      } catch (error) {
        if (error.response.data.errors) {
          setErrorForm(error.response.data.errors || {});
          // Aquí puedes manejar los errores, mostrar mensajes, etc.
        }
      }
    }
    else{
      users.actualizarUsuarios();
    }
  };



  return (
    <div className='body'>
      
      <div className='tablaus'>
        <div className='cab'>
          <h2>Lista de Clientes </h2>
          <Link onClick={abrirModal} className='botonAgregar' >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" fill='green' />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" fill='green'/>
            </svg>
          </Link>
        </div>

        <Form.Control
          placeholder="Buscar"
          aria-label="Buscador"
          aria-describedby="basic-addon2"
          required
          onChange={handleSearch}
          ref={searchRef}
        />

      {TableGen(cabecera,users,"clientes","",{abrirModalMod})}
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
        <Form onSubmit={handleSubmit(onSubmit)} className='login'>
          <h2>Nuevo Cliente</h2>
          <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
              <Col sm="15">
              <Form.Control size='lg' type='email' placeholder="email" {...register("email",{required:true})} />
              </Col>
              {errorForm.email && <span>{errorForm.email[0]}</span>}
          </Form.Group>
          <Form.Group as={Row} className="mb-4" controlId="formPlaintextUsername">
              <Col sm="15">
              <Form.Control size='lg' type='text' placeholder="username" {...register("username",{required:true})} />
              </Col>
              {errorForm.username && <span>{errorForm.username[0]}</span>}
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Col sm="15">
              <Form.Control size='lg' type="password" placeholder="Contraseña" {...register("password",{required:true})} />
              </Col>
              {errorForm.password && <span>{errorForm.password[0]}</span>}
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPasswordConfirm">
              <Col sm="15">
              <Form.Control size='lg' type="password" placeholder="Coonfirma la Contraseña" {...register("passwordConfirm",{required:true})} />
              </Col>
              {errorForm.passwordConfirm && <span>{errorForm.passwordConfirm[0]}</span>}
          </Form.Group>
          {errorForm && <span>{errorForm[0]}</span>}
          <Col sm="15" className='d-flex justify-content-between mr-5 ml-5'>
              <Button variant="primary" type='submit'>Guardar</Button>
              <Button variant="secondary" onClick={cerrarModal}>Cancelar</Button>
          </Col>
        </Form>
        
      </Modal>

      <Modal
          isOpen={modalAbiertoMod}
          onRequestClose={cerrarModalMod}
          contentLabel="Modificar"
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
        <Form onSubmit={handleSubmit(onSubmitMod)} className='login'>
          <h2>Modificar Cliente</h2>
          <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
              <Col sm="15">
              <Form.Control size='lg' type='email' placeholder="email" {...register("email",{required:true})} />
              </Col>
              {errorForm.email && <span>{errorForm.email[0]}</span>}
          </Form.Group>
          <Form.Group as={Row} className="mb-4" controlId="formPlaintextUsername">
              <Col sm="15">
              <Form.Control size='lg' type='text' placeholder="username" {...register("username",{required:true})} />
              </Col>
              {errorForm.username && <span>{errorForm.username[0]}</span>}
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Col sm="15">
              <Form.Control size='lg' type="password" placeholder="Contraseña" {...register("password",{required:false})} />
              </Col>
              {errorForm.password && <span>{errorForm.password[0]}</span>}
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPasswordConfirm">
              <Col sm="15">
              <Form.Control size='lg' type="password" placeholder="Coonfirma la Contraseña" {...register("passwordConfirm",{required:false})} />
              </Col>
              {errorForm.passwordConfirm && <span>{errorForm.passwordConfirm[0]}</span>}
          </Form.Group>
          {errorForm && <span>{errorForm[0]}</span>}
          <Col sm="15" className='d-flex justify-content-between mr-5 ml-5'>
              <Button variant="primary" type='submit'>Guardar</Button>
              <Button variant="danger"onClick={abrirConfirm} >Eliminar</Button>
              <Button variant="secondary" onClick={cerrarModalMod}>Cancelar</Button>
          </Col>
        </Form>
        
      </Modal>

      <Modal
          isOpen={modalConfirm}
          onRequestClose={cerrarConfirm}
          contentLabel="Confirmación"
          className="mi-modal"
          overlayClassName="mi-overlay"
      >
          <p>¿Estás seguro que deseas borrar a {usuarioSelected != null && usuarioSelected.username} como cliente, esto borrara todos sus registros?</p>
          <Col sm="15" className='d-flex justify-content-between'>
              <Button variant="success" onClick={() => handleDeleteUser(usuarioSelected != null &&  usuarioSelected.id)}>Aceptar</Button>
              <Button variant="secondary" onClick={cerrarConfirm}>Cancelar</Button>
          </Col>
      </Modal>
      

    </div>


    
  );
}