import React from 'react';
import deleteUser from '../images/del.png';
import PopUp from './PopUp';

const UserCollection = ({ user, index, handleDelete }) => {

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.number}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td className="d-flex justify-content-center">
                <img src={deleteUser} style={{ height: '30px', cursor: 'pointer' }} onClick={() => handleDelete(`${user._id}`)} alt="" />
            </td>
        </tr>
    );
};

export default UserCollection;