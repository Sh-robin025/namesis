import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { popUpContext } from '../App';
import PopUp from './PopUp';

const LoginPage = () => {
    const [error, setError] = useState()
    const [openPopUp, setOpenPopUp] = useContext(popUpContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const history = useHistory()

    const onSubmit = data => {
        axios.post("http://localhost:8000/login", data)
            .then(res => {
                setOpenPopUp(false)
                const token = res.data
                setError()
                sessionStorage.setItem("token", JSON.stringify(token));
                history.push('/dashboard')
            })
            .catch(err => {
                setError(err)
                setOpenPopUp(true)
            })
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-success"
            style={{ height: '100vh' }}>
            <Form onSubmit={handleSubmit(onSubmit)} className="col-md-4 bg-light rounded p-5">
                {
                    error && <h6 className="text-danger text-center">User didn't match. Try again</h6>
                }
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required
                        {...register("email")} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required
                        {...register("password")} />
                </Form.Group>
                <PopUp reqFor={'loginError'} />
            </Form>
        </div>
    );
};

export default LoginPage;