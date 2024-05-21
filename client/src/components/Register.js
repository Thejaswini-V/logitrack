import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Image1 from './LOGITRACK.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faTruckFast } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/register', formData);
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className='flex flex-row h-screen'>
      <div className='w-1/2 flex items-center justify-center'>
        <img src={Image1} className='w-full h-full' alt='Register Image' />
      </div>
      <div className='w-1/2 flex py-10 items-center justify-center bg-gray-100'>
        <div className='w-3/5 h-3/4 flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg shadow-xl'>
          <p className='text-3xl font-semibold text-gray-800 mb-6'>REGISTER</p>
          <form onSubmit={handleSubmit}>
            <div className='flex items-center mb-4'>
              <FontAwesomeIcon icon={faUser} className='mr-4' />
              <input
                className='p2 border border-slate-500 p-2 w-60 rounded-md'
                name='username'
                value={formData.username}
                onChange={handleChange}
                placeholder='Enter your Username'
              />
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faLock} className='mr-4' />
              <input
                className='p2 border border-slate-500 p-2 w-60 rounded-md'
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your Password'
              />
            </div>
            <div className='flex items-center flex-row mt-3'>
              <FontAwesomeIcon icon={faTruckFast} className='mr-4' />
              <select
                className='border border-slate-500 p-2 w-60 rounded-md'
                name='role'
                value={formData.role}
                onChange={handleChange}
              >
                <option value=''>Select your role</option>
                <option value='Inventory team'>Inventory team</option>
                <option value='Delivery team'>Delivery team</option>
              </select>
            </div>
            <button
              type='submit'
              className='w-3/4 h-2/8 rounded-lg p-3 m-5 bg-blue-400 text-white text-lg'
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
