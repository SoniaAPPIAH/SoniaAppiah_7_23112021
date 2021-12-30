import './App.css';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import Register from './pages/register/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Register />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;

