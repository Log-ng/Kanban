import React, { useEffect, useState } from 'react';
import InputForm from '../../components/signUpInput';
import { FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMySelector } from 'redux/hooks';
import { appRouters } from 'shared/urlResources';
import { UserSignUp } from 'shared/types/user';
import { errorList } from './errorList';
import { signUp } from './services';
import { CONTROLLER_SIGNUP } from 'shared/urlServices';

const SignUp: React.FC = () => {
  const isLogin = useMySelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [isExist, setIsExist] = useState<boolean>(false);
  const [userSignUp, setUserSignUp] = useState<UserSignUp>({
    username: '',
    password: '',
    fullname: '',
    passwordConfirm: '',
  });

  const validUsername =
    userSignUp.username.length >= 4 && userSignUp.username.length <= 30;
  const validFullname =
    userSignUp.fullname?.length >= 4 && userSignUp.fullname?.length <= 30;
  const validPassword =
    userSignUp.password?.length >= 2 && userSignUp.password?.length <= 20;
  const matchPassword =
    userSignUp.password.localeCompare(userSignUp.passwordConfirm) === 0
      ? true
      : false;

  const onNext = () => {
    if (validUsername && validFullname && validPassword && matchPassword) {
      signUp({
        controller: CONTROLLER_SIGNUP,
        username: userSignUp.username,
        password: userSignUp.password,
        fullname: userSignUp.fullname,
      }).then((response) => {
        if (response.data.status === 'Success') {
          navigate(`/${appRouters.LINK_TO_LOGIN_PAGE}`);
          return;
        }
        setIsShowError(true);
        setIsExist(true);
      });
    } else setIsShowError(true);
  };

  const getUserInfo = (type: string, value: string): void => {
    setIsShowError(false);
    setIsExist(false);
    switch (type) {
      case 'Username':
        setUserSignUp({
          ...userSignUp,
          username: value,
        });
        break;
      case 'Fullname':
        setUserSignUp({
          ...userSignUp,
          fullname: value,
        });
        break;
      case 'Password':
        setUserSignUp({
          ...userSignUp,
          password: value,
        });
        break;
      default:
        setUserSignUp({
          ...userSignUp,
          passwordConfirm: value,
        });
    }
  };

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
              <InputForm
                type='text'
                placeholder='Username'
                getUserInfo={getUserInfo}
                showError={(!validUsername || isExist) && isShowError}
              />
              <InputForm
                type='text'
                placeholder='Fullname'
                getUserInfo={getUserInfo}
                showError={!validFullname && isShowError}
              />
              <InputForm
                type='password'
                placeholder='Password'
                getUserInfo={getUserInfo}
                showError={!validPassword && isShowError}
              />
              <InputForm
                type='password'
                placeholder='Confirm password'
                getUserInfo={getUserInfo}
                showError={!matchPassword && isShowError}
              />
              {isShowError && (
                <motion.div
                  initial={{ y: '100px', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
                >
                  <svg
                    className='flex-shrink-0 inline w-5 h-5 mr-3'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'></path>
                  </svg>
                  <span className='sr-only'>Danger</span>
                  <div>
                    <span className='font-medium'>
                      Something wasn't right !!!
                    </span>
                    <ul className='mt-1.5 text-red-700 list-disc list-inside'>
                      {isExist && <li>{errorList.usernameExist}</li>}
                      {!validUsername && <li>{errorList.usernameError}</li>}
                      {!validFullname && <li>{errorList.fullnameError}</li>}
                      {!validPassword && <li>{errorList.passwordError}</li>}
                      {!matchPassword && <li>{errorList.passwordUnmatched}</li>}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
            <div className='col-span-3'>
              <div className='text-center'>
                <button className='button-next' onClick={() => onNext()}>
                  <div className='inline-block'>
                    <FaArrowRight size={50} />
                  </div>
                </button>
                <div className='mt-5 text-gray-400'>
                  Already have an account ?{' '}
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
