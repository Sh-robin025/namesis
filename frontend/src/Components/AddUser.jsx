import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import PopUp from './PopUp';

const AddUser = ({ submit, handleBlur, error }) => {
    const { register, handleSubmit } = useForm();

    return (
        <Form onSubmit={handleSubmit(submit)} className="col-md-10 bg-light rounded p-5">
            <h4 className="text-center mb-5">Add New User</h4>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter User Name" required
                    {...register("name")} onBlur={handleBlur} />
                {error?.name && <p className="text-danger">{error.name}</p>}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Mobile Number" required
                    {...register("number")} onBlur={handleBlur} />
                {error?.number && <p className="text-danger">{error.number}</p>}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>User Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" required
                    {...register("email")} onBlur={handleBlur} />
                {error?.email && <p className="text-danger">* {error.email}</p>}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter User Address" required
                    {...register("address")} onBlur={handleBlur} />
            </Form.Group>
            <PopUp reqFor={"addUser"} />
        </Form>
    );
};

export default AddUser;