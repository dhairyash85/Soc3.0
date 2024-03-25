import './App.css';
import  React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CurrentContract from './Context/CurrentContract';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
function App() {

  return (
    <CurrentContract>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </Router>
    </CurrentContract>
  );
}

export default App;
