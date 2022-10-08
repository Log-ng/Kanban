import React from 'react'

const PaginationTag = () => {
  return (
    <li>
      <div
        aria-current='page'
        className='z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
      >
        3
      </div>
    </li>
  );
}

export default PaginationTag