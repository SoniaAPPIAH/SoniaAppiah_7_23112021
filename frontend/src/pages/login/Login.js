import React, { useState } from "react";
import Header from "../../components/header/Header";
import './Login.css';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const login = () => {
        Axios.post("http://localhost:3001/auth/login", {
            email: email, password: password
            })
            .then((response) => {
                if (response.data.loggedIn) {
                    localStorage.setItem("loggedIn", true);
                    localStorage.setItem("email", response.data.email);
                    navigate.push("http://localhost:3000");
                } else {
                    setErrorMessage(response.data.message);
                }
            });
    };

    return (
        <>
        <Header />
        <div className="Login">
            <div className="LoginForm">
                <h1>SE CONNECTER</h1>
                <input type="text" placeholder="Email" onChange={(event) => {setEmail(event.target.value);}}/>
                <input type="password" placeholder="Mot de passe" onChange={(event) => {setPassword(event.target.value);}}/>
                <a href="http://localhost:3000">
                    <input type="button" onClick={login} className="ButtonLogin" value="Se connecter"/>
                </a>
                {errorMessage}
            </div>
        </div>
        </>
    );
};

export default Login;