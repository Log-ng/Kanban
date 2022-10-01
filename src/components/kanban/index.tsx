import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { mockData } from './mockData';
import Column from './Column';
import { BoardType, ColumnType } from 'shared/types/kanban';

const Kanban: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(mockData);
  const [columns, setColumns] = useState<ColumnType[]>([]);

  useEffect(() => {
    mockData.columns.sort((a: ColumnType, b: ColumnType) => {
      return board.columnOrder.indexOf(a.id) - board.columnOrder.indexOf(b.id);
    });
    setColumns(board.columns);
  }, []);

  return (
    <div className='h-[85vh] rounded-md bg-[#BCB4D8] px-5'>
      <nav className=''>board bar</nav>
      <Scrollbars style={{ height: '80vh' }}>
        <div className='flex rounded'>
          {columns.map((column: ColumnType) => (
            <Column column={column} key={column.id} />
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};

export default Kanban;
