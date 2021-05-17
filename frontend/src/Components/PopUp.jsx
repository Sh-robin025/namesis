import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { popUpContext } from '../App';

const PopUp = ({ reqFor }) => {
    const [openPopUp, setOpenPopUp] = useContext(popUpContext)
    console.log(reqFor)

    const handleClose = () => setOpenPopUp(false);

    return (
        <>
            <Button variant="primary" type="submit">
                Submit
            </Button>

            <Modal show={openPopUp} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title
                        className={reqFor === 'loginError' && "text-danger"}>
                        {reqFor === 'loginError' && 'Log in Error'}
                        {reqFor === 'addUser' && 'User Added Successfully'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {reqFor === 'loginError' && "Email or Password didn't match.Try again."}
                    {reqFor === 'addUser' && "Well Done ! You are successfully added a new user."}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PopUp;