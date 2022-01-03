import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Feed from './pages/feed/Feed';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/feed" exact element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
