import React from 'react';
import InputForm from '../../components/sign.up.input';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  return (
    <>
      <div className='text-6xl font-bold text-center my-2 text-titleLogin'>
        Kanban
      </div>
      <div className='w-2/3 mx-auto my-6'>
        <div className='w-100 justify-center border boder-cyan-50 shadow-lg p-5 rounded bg-white'>
          <div className='grid grid-cols-7 gap-2'>
            <div className='col-span-4 pl-5'>
              <div className='mb-5 text-5xl font-semibold'>Sign Up</div>
              <InputForm type='text' placeholder='Username' />
              <InputForm type='text' placeholder='Fullname' />
              <InputForm type='password' placeholder='Password' />
              <InputForm type='password' placeholder='Confirm password' />
            </div>
            <div className='col-span-3'>
              <div className='text-center'>
                <button className='button-next'>
                  <div className='inline-block'>
                    <FaArrowRight size={50} />
                  </div>
                </button>
                <div className='mt-5 text-gray-400'>
                  Already have an account?{' '}
                  <Link to='/login'>
                    <span className='cursor-pointer text-cyan-600 hover:underline'>Log in.</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
