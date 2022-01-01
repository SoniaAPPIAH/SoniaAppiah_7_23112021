import React, { useState } from "react";
import './Login.css';
import Axios from "axios";

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');

const login = () => {
    Axios.post("http://localhost:3000/api/auth/login", {
        email: email, password: password
        })
        .then((response) => {
            if (response.data.loggedIn) {
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("email", response.data.email);
            } else {
                setErrorMessage(response.data.message);
            }
        });
};

    return (
        <>
        <div className="Login">
            <div className="LoginForm">
                <input type="text" placeholder="Email" onChange={(event) => {setEmail(event.target.value);}}/>
                <input type="password" placeholder="Mot de passe" onChange={(event) => {setPassword(event.target.value);}}/>
                <button onClick={login} className="ButtonLogin">Se connecter</button>
                {errorMessage}
            </div>
        </div>
        </>
    );
};

export default Login;