import React from 'react';
import Axios from 'axios';
import cookie from 'js-cookie';
import './Logout.css';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Logout = () => {

    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 });
        }
    };

    const logout = async () => {

        Axios.get("http://localhost:3001/api/auth/logout", 
        { withCredentials: true })
            .then(() => removeCookie ('jwt'))
            .catch((err) => console.log(err))

        window.location = "/";
    };

    return (
    <div onClick={logout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="LogoLogout"/>
    </div>
    )
}

export default Logout;
