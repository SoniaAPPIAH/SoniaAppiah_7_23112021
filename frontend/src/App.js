import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/home/Home';
import Login from "./pages/login/Login"
//import EditProfil from './pages/EditProfil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route exact path="/connexion" component={Login} />
        <Route exact path="/editprofil" component={EditProfil} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

