import React, {useEffect} from 'react';
import InputForm from '../../components/signUpInput';
import { FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMySelector } from 'redux/hooks';
import { appRouters } from 'shared/urlResources';

const SignUp: React.FC = () => {
    const isLogin = useMySelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
      if (isLogin) navigate(`/${appRouters.LINK_TO_MAIN_PAGE}`);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <motion.div
      initial={{ y: '400px', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
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
                    <span className='cursor-pointer text-cyan-600 hover:underline'>
                      Log in.
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
