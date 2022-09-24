import React from 'react';
import Header from '../../components/header';

const Home: React.FC = () => {
  return (
    <div className='scale-x-95'>
      <Header />
      <div className='bg-office-home h-[85vh] bg-cover bg-center bg-fixed rounded-t-md pt-24'>
        <div className='text-white text-6xl tracking-widest font-semibold uppercase pl-6'>
          Welcome to Kanban!
        </div>
        <div className='text-white text-4xl tracking-widest font-semibold uppercase pl-6 mt-7'>
          Let's work together
        </div>
        <div className='text-teal-200 text-3xl tracking-widest font-semibold uppercase pl-6 mt-7'>
          getting started
        </div>
      </div>
    </div>
  );
};

export default Home;
