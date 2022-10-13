import Header from 'components/header';
import React, { useState, useEffect } from 'react';
import { useMyDispatch, useMySelector } from 'redux/hooks';
import IMAGE_AVATAR from './avatar.jpg';
import { motion } from 'framer-motion';
import { getSingleUser } from './services';
import { User } from 'shared/types/user';
import { loginSuccess } from 'redux/authSlice';

const Profile: React.FC = () => {
  const dispatch = useMyDispatch();
  const [currentUser, setCurrentUser] = useState<User>({
    fullname: useMySelector((state) => state.auth.currentUser.fullname) ?? '',
    username: useMySelector((state) => state.auth.currentUser.username) ?? '',
  });

  useEffect(() => {
    getSingleUser().then((res) => {
      setCurrentUser(res.data.user ?? {});
      dispatch(loginSuccess(res.data.user));
    });
  }, []);

  return (
    <div className='scale-x-95'>
      <Header />
      <motion.div
        initial={{ x: '100px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className='grid grid-cols-2'>
          <div className='flex justify-end mr-12 pt-5'>
            <img
              className='w-80 h-80 rounded-full ring-2 ring-gray-300 dark:ring-gray-500'
              src={IMAGE_AVATAR}
              alt='Rounded avatar'
            ></img>
          </div>
          <div>
            <div className='mt-[100px] text-xl font-semibold'>
              Username:{' '}
              <span className='text-colorHome font-normal'>
                {currentUser.username}
              </span>
            </div>
            <div className='mt-[40px] text-xl font-semibold'>
              Fullname:{' '}
              <span className='text-colorHome font-normal'>
                {currentUser.fullname}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
