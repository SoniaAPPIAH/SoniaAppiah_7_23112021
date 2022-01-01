import React from "react";
import Header from '../../components/header/Header';
import Connexion from '../connection/Connection';


function Home() {
  const user = JSON.parse(localStorage.getItem("connectedUser"));
  const direction = ()=>{
      if(user != null) {
          return console.log('je sais pas')
      }
      else {
          return <Connexion/>
      }        
  }
  return (
    <>
      <Header />
        <div className="main">
            {direction()}
        </div>
    </>
  );
}

export default Home

