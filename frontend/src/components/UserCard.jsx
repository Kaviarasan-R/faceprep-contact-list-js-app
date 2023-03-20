/* React Libraries */
import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

/* Styles */
import '../assets/styles/UserCard.css'

const UserCard = forwardRef((props,ref) => {
    const navigate = useNavigate();
    const {user} = props
    return (
        <div className="user-card" ref={ref} onClick={() => navigate(`/contacts/${user.login.uuid}`, {state: user})}>
            <img className="avatar" src={user.picture.thumbnail} alt="user" />
            <div className="info">
                <h3>{user.name.first} {user.name.last}</h3>
                <p>Email: {user.email}</p>
                <p>Username: {user.login.username}</p>
                <p>Phone: {user.phone}</p>
            </div>
        </div>
    );
});
export default UserCard;
