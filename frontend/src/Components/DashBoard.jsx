import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Container, Table } from 'react-bootstrap';
import { popUpContext } from '../App';
import AddUser from './AddUser';
import PopUp from './PopUp';
import UserCollection from './UserCollection';

const DashBoard = () => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState()
    const [openPopUp, setOpenPopUp] = useContext(popUpContext)

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/users'
        }).then(res => res.status === 200 && setUsers(res.data))
    }, [])

    const handleBlur = (e) => {
        const title = e.target.name;
        const typed = e.target.value;
        let dataValid;
        if (title === 'name') {
            dataValid = /[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/.test(typed)
            dataValid ? setError({ ...error, name: '' }) : setError({ ...error, name: 'Invalid name.Only alphanumeric characters.' })
        }
        if (title === 'number') {
            dataValid = /(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(typed)
            dataValid ? setError({ ...error, number: '' }) : setError({ ...error, number: "Invalid number.10 digit number is needed." })
        }
        if (title === 'email') {
            dataValid = /\S+@\S+\.\S+/.test(typed)
            dataValid ? setError({ ...error, email: '' }) : setError({ ...error, email: "Invalid email." })
        }
        if (error?.name === "" && error?.number === "" && error?.email === "") setError()
    }

    const handleAddUser = data => {
        if (error) {
            setError("all data should be valid")
            alert(error)
        } else {
            axios.post('http://localhost:8000/addUser', {
                headers: { 'Content-Type': 'application/json' },
                body: data
            })
                .then(result => {
                    setOpenPopUp(true)
                    axios.get('http://localhost:8000/users')
                        .then(res => res.status === 200 && setUsers(res.data))
                })
                .catch(err => console.log(err))
        }
    }

    const handleDeleteUser = (id) => {
        axios({
            method: 'delete',
            url: `http://localhost:8000/deleteUser/${id}`,
        })
            .then(res => {
                alert("User Deleted Successfully from collection")
                axios.get('http://localhost:8000/users')
                    .then(res => res.status === 200 && setUsers(res.data))
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Container fluid>
                <Row style={{ minHeight: '100vh' }}>
                    <Col md={5} className="d-flex justify-content-center">
                        <AddUser submit={handleAddUser} handleBlur={handleBlur} error={error} />
                    </Col>
                    <Col md={7} className="bg-light p-3">
                        <h4 className="text-center py-4">There are {users?.length} users in your collection</h4>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users?.map((user, index) => <UserCollection user={user} index={index} handleDelete={handleDeleteUser} key={user._id} />)
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DashBoard;