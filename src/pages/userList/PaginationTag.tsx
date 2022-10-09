import React from 'react';

interface Props {
  numPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const PaginationTag: React.FC<Props>= (props) => {
  const { numPage, setCurrentPage, currentPage } = props;
  return (
    <li onClick={() => setCurrentPage(numPage)}>
      <div
        aria-current='page'
        className={
          'paging-tag ' +
          (numPage === currentPage ? 'bg-[#68589b] text-white' : '')
        }
      >
        {numPage}
      </div>
    </li>
  );
};

export default PaginationTag;
