import React from 'react';

interface Props {
  index: number;
  username: string;
  fullname: string;
  columns: number;
}

const RowTable: React.FC<Props> = (props) => {
  const {index, username, fullname, columns} = props;

  return (
    <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
        {index}
      </td>
      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
        {username}
      </td>
      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
        {fullname}
      </td>
      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
        {columns}
      </td>
    </tr>
  );
};

export default RowTable;
