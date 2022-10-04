import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMyDispatch, useMySelector } from 'redux/hooks';
import { appRouters } from 'shared/urlResources';
import { AuthRequest } from 'shared/types/auth';
import { authLogin } from './services';
import { loginSuccess } from 'redux/authSlice';
import { errorList } from './errorList';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { CONTROLLER_LOGIN } from 'shared/urlServices';

const Login: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useMyDispatch();
  const [userLogin, setUserLogin] = useState<AuthRequest>({
    username: '',
    password: '',
    controller: CONTROLLER_LOGIN,
  });
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const isLogin = useMySelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (isLogin) navigate(`/${appRouters.LINK_TO_MAIN_PAGE}`);
  },[])
  
  const onClickLoginButton = () => {
    authLogin(userLogin).then((response) => {
      if (response.data.status === 'Success') {
        dispatch(
          loginSuccess({
            username: userLogin.username,
            fullname: response.data.fullname,
          })
        );
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', userLogin.username);
        localStorage.setItem('fullname', response.data.fullname ?? '');

        navigate(`/${appRouters.LINK_TO_MAIN_PAGE}`);
      }
      setIsShowError(true);
      setIsLoading(false);
    });
  };

  return (
    <motion.div
      initial={{ x: '-300px', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <div className='text-6xl font-bold text-center my-2 text-titleLogin'>
        Kanban
      </div>
      <div className='flex justify-center my-6'>
        <div className='w-96 justify-center border boder-cyan-50 shadow-lg p-5 rounded bg-white'>
          <div className='text-center mb-3 text-lg font-semibold'>
            Login to Kanban
          </div>
          <div>
            <input
              className='input-login'
              type='text'
              placeholder='Username'
              onChange={(e) => {
                setUserLogin({ ...userLogin, username: e.target.value });
                setIsShowError(false);
              }}
            />
            <input
              className='input-login'
              type='password'
              placeholder='Password'
              onChange={(e) => {
                setUserLogin({ ...userLogin, password: e.target.value });
                setIsShowError(false);
              }}
            />
            {!isLoading && (
              <button
                className='transition bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full'
                onClick={() => {
                  onClickLoginButton();
                  setIsLoading(true);
                }}
              >
                Login
              </button>
            )}
            {isLoading && (
              <div className='ml-[10rem]'>
                <PropagateLoader
                  speedMultiplier={1}
                  color={'#3b82f6'}
                  size={15}
                />
              </div>
            )}

            {isShowError && (
              <div
                className='p-4 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 text-center'
                role='alert'
              >
                <span className='font-medium'>
                  {userLogin.username.length === 0
                    ? errorList.emptyUsername
                    : userLogin.password.length === 0
                    ? errorList.emptyPassword
                    : errorList.loginFail}
                </span>
              </div>
            )}

            <div className='relative flex py-5 items-center'>
              <div className='flex-grow border-t border-gray-400'></div>
              <span className='flex-shrink mx-4 text-gray-400'>OR</span>
              <div className='flex-grow border-t border-gray-400'></div>
            </div>
            <Link to={`/${appRouters.LINK_TO_SIGN_UP_PAGE}`}>
              <button className='transition bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded w-full'>
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
