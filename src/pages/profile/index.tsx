import Header from 'components/header';
import React from 'react';
import { useMySelector } from 'redux/hooks';
import IMAGE_AVATAR from './avatar.jpg';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const username = useMySelector((state) => state.auth.currentUser.username);
  const fullname = useMySelector((state) => state.auth.currentUser.fullname);
  return (
    <div className='scale-x-95'>
      <motion.div
      initial={{ x: '100px', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <Header />
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
            <span className='text-colorHome font-normal'>{username}</span>
          </div>
          <div className='mt-[40px] text-xl font-semibold'>
            Fullname:{' '}
            <span className='text-colorHome font-normal'>{fullname}</span>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
    
  );
};

export default Profile;
