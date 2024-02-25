import '../../static/css/home.css';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { UsDoc } from '../../components/listarDocumentos';
import { CardDoc, CardDocCli } from '../../components/cardDoc';
import FormData from 'form-data';
import { useRef } from 'react';
import Modal from 'react-modal';
import React, { useState} from 'react';
import {useForm} from "react-hook-form";
import { UsCat } from '../../components/listarCategorias';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GuardarCat, ModificarCat, DeleteCat } from '../../Api/DocumentosApi';
import { TableGen } from '../../components/table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export function ListarCategorias(){
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalAbiertoMod, setModalAbiertoMod] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [categoriaSelected, setCategoriaASelected] = useState(null);
    const { register, handleSubmit, reset, setValue } = useForm();
    const categorias = UsCat();
    const [errorForm, setErrorForm] = useState({});
    const cabecera = ['nombre']

    // Agregar Documento

    const onSubmit = handleSubmit(async data =>{
    setErrorForm({});
    try {
        const response = await GuardarCat(data);
        if (response.status == 401) {
            Cookies.remove('token');
        }
        if (response.status === 201) {
        categorias.actualizarCategorias();
        cerrarModal();
        reset();
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
    reset();
    };

    const cerrarModal = () => {
    setModalAbierto(false);
    reset();
    };

    // Agregar Documento

    const onSubmitMod = handleSubmit(async data =>{
    setErrorForm({});
    try {
        const response = await ModificarCat(categoriaSelected.id,data);
        console.log(response.status)
        if (response.status == 401) {
            console.log(response.status)
            // Cookies.remove('token');
        }
        if (response.status === 200) {
        categorias.actualizarCategorias();
        cerrarModalMod();
        reset();
        }
    }catch (error) {
        console.log(error)
        if (error.response) {
            setErrorForm(error.response.data.errors || {});
            // Aquí puedes manejar los errores, mostrar mensajes, etc.
        }
    }
    })

    const abrirModalMod = (cat) => {
        reset();
        setCategoriaASelected(cat);
        setValue('nombre', cat.nombre);
        setModalAbiertoMod(true);
    };

    const cerrarModalMod = () => {
        setModalAbiertoMod(false);
        setCategoriaASelected(null)
        reset();
    };

    // eliminar categoria 

    const handleDeleteCat = async (id) => {
        if (id){
            try {
                const response = await DeleteCat(id);
                if (response.status == 401) {
                Cookies.remove('token');
                }
                if (response.status == 204) {
                cerrarConfirm();
                categorias.actualizarCategorias();
                setCategoriaASelected(null);
                }
            } catch (error) {
                console.log(error)
                if (error.response.data.errors) {
                    setErrorForm(error.response.data.errors || {});
                }
            }
        };
    };

    const abrirConfirm = (cat) => {
        cerrarModalMod();
        setCategoriaASelected(cat)
        setModalConfirm(true);
    };

    const cerrarConfirm = () => {
        setModalConfirm(false);
        setCategoriaASelected(null);
    };




    return (
    <div className='contencat'>
        <div className='contentcatbot d-flex justify-content-between'>
            <Button onClick={abrirModal} variant="primary">
                Agregar Categoria     
            </Button>
            <span className='volver'>
            <Button as={Link} to="../" variant="secondary">
                Volver         
            </Button>
            </span>
        </div>
        <div className='contenedorcat'>
        {TableGen(cabecera,categorias.categorias,"categorias",{abrirConfirm},{abrirModalMod})}
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
            <h2>Nueva Categoria</h2>
            <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
                <Col sm="15">
                <Form.Control size='lg' type='text' placeholder="Nombre de la categoria" {...register("nombre",{required:true})} />
                </Col>
                {errorForm.nombre && <span>{errorForm.nombre[0]}</span>}
            </Form.Group>
            <Col sm="15" className='d-flex justify-content-between mr-5 ml-5'>
                <Button variant="primary" type='submit'>Guardar</Button>
                <Button variant="secondary" onClick={cerrarModal}>Cancelar</Button>
            </Col>
        </Form>
        
        </Modal>

        <Modal
            isOpen={modalAbiertoMod}
            onRequestClose={cerrarModalMod}
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
        <Form onSubmit={handleSubmit(onSubmitMod)} className='login'>
            <h2>Editar Categoria</h2>
            <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
                <Col sm="15">
                <Form.Control size='lg' type='text' placeholder="Nombre de la categoria" {...register("nombre",{required:true})} />
                </Col>
                {errorForm.nombre && <span>{errorForm.nombre[0]}</span>}
            </Form.Group>
            <Col sm="15" className='d-flex justify-content-between mr-5 ml-5'>
                <Button variant="primary" type='submit'>Guardar</Button>
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
          <p>¿Estás seguro que deseas borrar a {categoriaSelected != null && categoriaSelected.nombre} como cliente, esto borrara todos sus registros?</p>
          <Col sm="15" className='d-flex justify-content-between'>
              <Button variant="success" onClick={() => handleDeleteCat(categoriaSelected != null &&  categoriaSelected.id)}>Aceptar</Button>
              <Button variant="secondary" onClick={cerrarConfirm}>Cancelar</Button>
          </Col>
        </Modal>




    </div>
    );
}
