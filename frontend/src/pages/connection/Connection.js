import { useState } from 'react'
import Register from '../register/Register';
import Login from '../login/Login';
import './Connection.css';

function Connection() {
    const [signUpModal, setSignUpModal] = useState(true);
    const [loginModal, setLoginModal ] = useState(false);

    const handleModals = (clic) => {
        if(clic.target.id === "register"){
            setSignUpModal(true);
            setLoginModal(false);
        } else if (clic.target.id === "login"){
            setSignUpModal(false);
            setLoginModal(true);
        }
    }   
    return (
        <div className="connectionForm">
            <div className="connectionButtons">
                <div className="titleRegisterLogin" id="register" onClick={handleModals}>S'inscrire</div>
                <div className="titleRegisterLogin" id="login" onClick={handleModals}>Se connecter</div>
            </div>                   
                {signUpModal && <Register/>}
                {loginModal && <Login/>}     
        </div>
    );
};

export default Connection;
