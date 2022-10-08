import Header from 'components/header';
import React from 'react';
import { motion } from 'framer-motion';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';
import RowTable from './RowTable';

const UserList = () => {
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
                    <RowTable index={1} username='long' fullname='long' columns={2}/>
                    <RowTable index={2} username='long' fullname='long' columns={2}/>
                    <RowTable index={3} username='long' fullname='long' columns={2}/>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <nav aria-label='Page navigation example'>
          <ul className='inline-flex items-center -space-x-px'>
            <LeftTag/>
            <PaginationTag/>
            <PaginationTag/>
            <PaginationTag/>
            <PaginationTag/>
            <RightTag/>
          </ul>
        </nav>
      </motion.div>
    </div>
  );
};

export default UserList;
