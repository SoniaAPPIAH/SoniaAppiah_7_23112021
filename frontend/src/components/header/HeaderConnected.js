import React from 'react';
import './HeaderConnected.css';
import Logout from '../../pages/logout/Logout';

function HeaderConnected() {
    return (
        <header className="HeaderConnected">
            <img className="LogoConnected" src="./img/logo/icon-left-font.svg" alt="Groupomania" />
            <Logout />
        </header>
    )
}

export default HeaderConnected;