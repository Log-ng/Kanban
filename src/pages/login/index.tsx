import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <>
      <div className='text-6xl font-bold text-center my-2 text-titleLogin'>
        Kanban
      </div>
      <div className='flex justify-center my-6'>
        <div className='w-96 justify-center border boder-cyan-50 shadow-lg p-5 rounded bg-white'>
          <div className='text-center mb-3 text-lg font-semibold'>
            Login to Kanban
          </div>
          <div>
            <input className='input-login' type='text' placeholder='Username' />
            <input
              className='input-login'
              type='password'
              placeholder='Password'
            />
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full'>
              Login
            </button>
            <div className='relative flex py-5 items-center'>
              <div className='flex-grow border-t border-gray-400'></div>
              <span className='flex-shrink mx-4 text-gray-400'>OR</span>
              <div className='flex-grow border-t border-gray-400'></div>
            </div>
            <Link to='/signup'>
              <button className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded w-full'>
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
