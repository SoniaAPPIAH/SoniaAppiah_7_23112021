import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';

function App() {
  return (
    <Header />
    //<Router>
      //<Route path="/" exact render={() => <Home />} />
   // </Router>
  );
}

export default App;
