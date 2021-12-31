import React, { useState } from "react";
import Header from '../../components/header/Header';
import './Register.css';
import Axios from "axios";
// import { useNavigate } from "react-router-dom";

function Register() {
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   // const navigate = useNavigate();
    
    const register = () => {
        Axios.post("http://localhost:3001/auth/register", {
            lastname: lastname, firstname: firstname, email: email, password: password
        }).then((response) => {
            console.log(response);
        });
    };

    return (
        <>
        <Header />
        <div className="Register">
            <div className="RegisterForm">
                <h1>S'INSCRIRE</h1>
                <div className="FirstAndLasteName">
                    <input className="FirstAndLasteNameInput" type="text" placeholder="Nom" onChange={(event) => {setLastname(event.target.value);}}/>
                    <input className="FirstAndLasteNameInput" type="text" placeholder="Prénom" onChange={(event) => {setFirstname(event.target.value);}}/>
                </div>
                <input type="text" placeholder="Email" onChange={(event) => {setEmail(event.target.value);}} />
                <input type="password" placeholder="Mot de passe" onChange={(event) => {setPassword(event.target.value);}} />
                <button onClick={register} className="ButtonRegister">S'inscrire</button>
                <p>Vous avez déjà un compte ? <a href="http://localhost:3000/login">Connectez-vous !</a></p>
            </div>
        </div>
        </>
    );
}

export default Register;