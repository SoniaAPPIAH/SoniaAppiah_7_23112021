import React, { useState } from "react";
import './Register.css';
import Axios from "axios";
// import { useNavigate } from "react-router-dom";

function Register() {
    const [errorMessage, setErrorMessage] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   // const navigate = useNavigate();
    
    const handleRegister = () => {
        Axios.post("http://localhost:3001/api/auth/register", {
            lastname: lastname, firstname: firstname, email: email, password: password
        }).then((response) => {
            setErrorMessage(response.data.message);
        });
    };

    return (
        <>
        <div className="Register">
            <div className="RegisterForm">
                <div className="FirstAndLasteName">
                    <input className="FirstAndLasteNameInput" type="text" placeholder="Nom" onChange={(event) => {setLastname(event.target.value);}}/>
                    <input className="FirstAndLasteNameInput" type="text" placeholder="Prénom" onChange={(event) => {setFirstname(event.target.value);}}/>
                </div>
                <input type="text" placeholder="Email" onChange={(event) => {setEmail(event.target.value);}} />
                <input type="password" placeholder="Mot de passe" onChange={(event) => {setPassword(event.target.value);}} />
                <button onClick={handleRegister} className="ButtonRegister">S'inscrire</button>
                <p>Vous avez déjà un compte ? Connectez-vous !</p>
                {errorMessage}
            </div>
        </div>
        </>
    );
}

export default Register;