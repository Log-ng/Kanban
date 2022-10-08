import React from 'react';

interface Props {
  onClick: () => void;
}

const RightTag: React.FC<Props> = (props) => {
  const { onClick } = props;
  return (
    <li>
      <div
        onClick={onClick}
        className='cursor-pointer block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-[#68589b] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
      >
        <svg
          aria-hidden='true'
          className='w-5 h-5'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'></path>
        </svg>
      </div>
    </li>
  );
};

export default RightTag;
