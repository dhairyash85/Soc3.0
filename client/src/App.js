import './App.css';
import  React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CurrentContract from './Context/CurrentContract';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Upload from './Components/Upload';
import Explore from './Components/Explore';
import Profile from './Components/Profile';
function App() {

  return (
    <div className='fixed inset-0 -z-10 min-h-full w-full bg-gradient-to-t from-gray-500 to-black'>
       <div className="h-full" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/batthern.png')"}}>

    <CurrentContract>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/upload' element={<Upload />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/explore' element={<Explore />}/>
        </Routes>
      </Router>
    </CurrentContract>
    </div>
    </div>
  );
}

export default App;
