import './App.css';
import  React from 'react'
import CurrentContract from './Context/CurrentContract';
function App() {
  return (
    <CurrentContract>

    <div className='flex justify-center'>
      <p className=' font-bold'>Hi</p>
    </div>
    </CurrentContract>
  );
}

export default App;
