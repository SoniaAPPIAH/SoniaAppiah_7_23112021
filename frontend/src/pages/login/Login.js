import React, { useState } from "react";
import './Login.css';
import Axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        Axios.post("http://localhost:3001/api/auth/login", 
        { email: email, password: password},
        { withCredentials: true })
            .then((res) => {
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    window.location = '/feed';
                }
            })
            .catch ((err) => {
                console.log(err)
            })
    };

    return (
        <form action="" onSubmit={handleLogin} id="LoginForm">
            <input 
                type="text" 
                name="email" 
                id="email" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}/>
            <div className="email error"></div>
            <input 
                type="password" 
                name="password"
                id="password"
                placeholder="Mot de passe" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}/>
            <div className="password error"></div>
            <button className="ButtonLogin">Se connecter</button>
        </form>
    );
};

export default Login;

