import React from 'react';
import { BsFillKanbanFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { appRouters } from 'shared/url.resources';
import { useMySelector } from 'redux/hooks';

const Header: React.FC = () => {
  const isLogin = useMySelector((stata) => stata.auth.isLoggedIn);
  const fullName = useMySelector((stata) => stata.auth.currentUser?.fullName);
  return (
    <nav className='grid grid-cols-7 gap-4 bg-colorHome p-6 mb-1 rounded-md'>
      <Link to={`/${appRouters.LINK_TO_HOME_PAGE}`} className='col-span-1 '>
        <div className='flex items-center text-white transition hover:scale-105'>
          <BsFillKanbanFill className='mr-3' size={30} />
          <span className='font-semibold text-xl tracking-tight'>Kanban</span>
        </div>
      </Link>

      {!isLogin && (
        <div className='col-start-6 w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
          <Link to={`/${appRouters.LINK_TO_LOGIN_PAGE}`}>
            <div className='bg-transparent transition text-white font-semibold py-2 px-10 border border-white-500 rounded-full hover:bg-white hover:text-colorHome'>
              Login
            </div>
          </Link>
        </div>
      )}

      {!isLogin && (
        <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
          <Link to={`/${appRouters.LINK_TO_SIGN_UP_PAGE}`}>
            <div className='bg-white transition text-colorHome font-semibold py-2 px-8 border rounded-full hover:scale-95'>
              Sign Up
            </div>
          </Link>
        </div>
      )}

      {isLogin && (
        <div className='bg-white col-start-6 w-full block flex-grow lg:flex lg:items-center lg:w-auto text-colorHome text-xl font-bold rounded m-auto p-1 px-7'>
          {fullName}
        </div>
      )}
    </nav>
  );
};

export default Header;
