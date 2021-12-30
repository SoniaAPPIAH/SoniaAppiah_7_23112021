import './App.css';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;