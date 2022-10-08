import Header from 'components/header';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';
import RowTable from './RowTable';
import { User } from 'shared/types/user';
import { getUser } from './services';

const RECORD_PER_PAGE = 5;
const TOTAL_PAGE_DEFAULT = 1;

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPage = useRef(TOTAL_PAGE_DEFAULT);

  const prevPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage >= totalPage.current) return;
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getUser(currentPage, RECORD_PER_PAGE).then((res) => {
      setUsers(res.data.users);
      totalPage.current = Math.ceil(res.data.totalUser / RECORD_PER_PAGE);
    });
  }, [currentPage]);

  return (
    <div className='scale-x-95'>
      <Header />
      <motion.div
        initial={{ x: '100px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className='flex flex-col'>
          <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
              <div className='overflow-hidden'>
                <table className='min-w-full'>
                  <thead className='bg-white border-b'>
                    <tr>
                      <th
                        scope='col'
                        className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                      >
                        #
                      </th>
                      <th
                        scope='col'
                        className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                      >
                        Username
                      </th>
                      <th
                        scope='col'
                        className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                      >
                        Fullname
                      </th>
                      <th
                        scope='col'
                        className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                      >
                        Columns
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user: User, index) => (
                      <RowTable
                        key={user.username}
                        index={index + 1 + (currentPage - 1) * RECORD_PER_PAGE}
                        username={user.username}
                        fullname={user.fullname ?? ''}
                        columns={2}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <nav aria-label='Page navigation example'>
          <ul className='inline-flex items-center -space-x-px'>
            <LeftTag onClick={prevPage} />
            {Array.from(Array(totalPage.current).keys()).map((index) => (
              <PaginationTag
                key={index}
                numPage={index + 1}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            ))}
            <RightTag onClick={nextPage} />
          </ul>
        </nav>
      </motion.div>
    </div>
  );
};

export default UserList;
