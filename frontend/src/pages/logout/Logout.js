import React from 'react';
import Axios from 'axios';
import cookie from 'js-cookie';

const Logout = () => {

    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 });
        }
    };

    const logout = async () => {

        Axios.get("http://localhost:3001/api/auth/logout", {
            withCredentials: true
        })
            .then(() => removeCookie ('jwt'))
            .catch((err) => console.log(err))

        window.location = "/";
    };

    return (
    <li onClick={logout}>
        <p>logout</p>
    </li>
    )
}

export default Logout;
