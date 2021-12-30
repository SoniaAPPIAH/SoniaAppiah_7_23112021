import React from 'react';
import Header from '../../components/header/Header';
import './Register.css';

function Register() {
    return (
        <>
        <Header />
        <div className="Register">
            <div className="RegisterForm">
                <h1>S'INSCRIRE</h1>
                <div className="FirstAndLasteName">
                    <input className="FirstAndLasteNameInput" type="text" placeholder="Nom" />
                    <input className="FirstAndLasteNameInput" type="text" placeholder="Prénom" />
                </div>
                <input type="text" type="text" placeholder="Email" />
                <input type="text" type="text" placeholder="Mot de passe" />
                <button className="ButtonRegister">S'inscrire</button>
                <p>Vous avez déjà un compte ? <a href="./login/Login">Connectez-vous !</a></p>
            </div>
        </div>
        </>
    )
}

export default Register
