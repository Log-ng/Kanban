import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMySelector } from 'redux/hooks';
import { appRouters } from 'shared/urlResources';
import Header from '../../components/header';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
    const isLogin = useMySelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
      if (isLogin) navigate(`/${appRouters.LINK_TO_MAIN_PAGE}`);
    }, []);
    
  return (
    <div className='scale-x-95'>
      <Header />
      <motion.div
        className='bg-office-home h-[85vh] bg-cover bg-center bg-fixed rounded-t-md pt-24'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className='text-white text-6xl tracking-widest font-semibold uppercase pl-6'>
          Welcome to Kanban!
        </div>
        <div className='text-white text-4xl tracking-widest font-semibold uppercase pl-6 mt-7'>
          Let's work together, try hard to get the best!
        </div>
        <div className='text-teal-200 text-3xl tracking-widest font-semibold uppercase pl-6 mt-7'>
          getting started
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
