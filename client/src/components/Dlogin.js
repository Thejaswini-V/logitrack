import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image1 from './LOGITRACK.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function Dlogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/Delpg');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className='flex flex-row h-screen'>
      <div className='w-1/2 flex items-center justify-center'>
        <img src={Image1} className='w-full h-full' alt='Login Image' />
      </div>
      <div className='w-1/2 flex py-10 items-center justify-center bg-gray-100'>
        <div className='w-3/5 h-3/4 flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg shadow-xl'>
          <p className='text-3xl font-semibold text-gray-800 mb-6'>Delivery Team</p>
          <form onSubmit={handleLogin}>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faUser} className='mr-4'/>
              <input 
                className='p-2 border border-slate-500 w-60 rounded-md' 
                placeholder='Enter your UserName' 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faLock} className='mr-4'/>
              <input 
                className='p-2 border border-slate-500 w-60 rounded-md' 
                type='password' 
                placeholder='Type your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              type='submit' 
              className='w-3/4 h-2/8 rounded-lg p-3 m-5 bg-blue-400 text-white text-lg'
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dlogin;
