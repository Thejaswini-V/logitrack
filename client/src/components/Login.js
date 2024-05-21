import React from 'react';
import Image1 from './LOGITRACK.png';
import { useNavigate, Link} from 'react-router-dom';

function Login() {
  const navigate=useNavigate();
  const handleinv=()=>{
    navigate('/Ilogin')
  }
  const handledel=()=>{
    navigate('/Dlogin')
  }
  return (
    <div className='flex flex-row h-screen'>
      <div className='w-1/2 flex items-center justify-center'>
        <img src={Image1} className='w-full h-full' alt='Login Image' />
      </div>
      <div className='w-1/2 flex items-center justify-center bg-gray-100'>
        <div className='w-3/5 h-3/4 flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg shadow-xl'>
          <p className='text-3xl font-semibold text-gray-800 mb-6'>LOGIN</p>
          <button className="w-3/4 rounded-lg p-3 bg-blue-400 text-white text-lg mb-4" onClick={handleinv}>INV Team</button>
          <button className="w-3/4 rounded-lg p-3 bg-blue-400 text-white text-lg" onClick={handledel}>DEL Team</button>
          <p className='text-xs font-light m-3 text-gray-800 mb-6'>
          New User? <Link to="/Register">Register</Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
