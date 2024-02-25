import '../../static/css/login.css';
import {useForm} from "react-hook-form";
import React, { useState } from 'react';
import {LogearUsuario, ObtenerToken} from "../../Api/UsuariosApi"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';
import { useAuthContext } from "../../utils/authContext";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export function Login(){
    const {register, handleSubmit}= useForm();
    const [errorForm, setErrorForm] = useState({});
    const {login} = useAuthContext();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async data =>{
        setErrorForm({});
        try {
            const response = await LogearUsuario(data);
            
            if (response.status === 200) {
                Cookies.set('token', response.data.token);
                Cookies.set('group', response.data.group);
                Cookies.set('id', response.data.id);
                login();
                if(response.data.group == 1){
                    navigate('/Clientes/');
                }
                else if(response.data.group == 2){
                    navigate('/vencimientos/');
                }
                
            } else {
                navigate('/login');
            }
        } catch (error) {
            if (error.response.data.errors.errors) {
                setErrorForm(error.response.data.errors.errors || {});
            }
        }
    })


    return(
        <div className='body'>

            <div className='formlogin'>

                <Form  onSubmit={onSubmit} className='login'>
                    <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
                        <Col sm="15">
                        <Form.Control size='lg' type='text' placeholder="username" {...register("username",{required:true})} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm="15">
                        <Form.Control size='lg' type="password" placeholder="Password" {...register("password",{required:true})} />
                        </Col>
                    </Form.Group>
                    {errorForm && <span>{errorForm[0]}</span>}
                    <Col sm="15">
                        <Button variant="primary" type='submit'>Ingresar</Button>
                    </Col>
                </Form>
            </div>
        </div>


        
    )
}