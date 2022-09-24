import React from 'react';
import { BsFillKanbanFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className='grid grid-cols-7 gap-4 bg-colorHome p-6 mb-1 rounded-md'>
      <Link to='/' className='col-span-1 '>
        <div className='flex items-center text-white transition hover:scale-105'>
          <BsFillKanbanFill className='mr-3' size={30} />
          <span className='font-semibold text-xl tracking-tight'>Kanban</span>
        </div>
      </Link>

      <div className='col-start-6 w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
        <Link to='./login'>
          <div className='bg-transparent transition text-white font-semibold py-2 px-10 border border-white-500 rounded-full hover:bg-white hover:text-colorHome'>
            Login
          </div>
        </Link>
      </div>

      <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
        <Link to='./signup'>
          <div className='bg-white transition text-colorHome font-semibold py-2 px-4 border rounded hover:scale-90'>
            Sign Up
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
