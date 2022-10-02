import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { mockData } from './mockData';
import Column from './Column';
import { BoardType, ColumnType } from 'shared/types/kanban';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { applyDrag } from './dragDrop';

const Kanban: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(mockData);
  const [columns, setColumns] = useState<ColumnType[]>([]);

  useEffect(() => {
    mockData.columns.sort((a: ColumnType, b: ColumnType) => {
      return board.columnOrder.indexOf(a.id) - board.columnOrder.indexOf(b.id);
    });
    setColumns(board.columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onColumnDrop = (dropResult: DropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onCardDrop = (columnId: string, dropResult: DropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];

      let currentColumn = newColumns.find((c) => c.id === columnId) ?? {
        cards: [],
        cardOrder: '',
      };
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((card) => card.id);
      setColumns(newColumns);
    }
  };

  return (
    <div className='h-[85vh] rounded-md bg-[#BCB4D8] px-5'>
      <nav className=''>board bar</nav>
      <Scrollbars style={{ height: '80vh' }}>
        <div className='flex rounded'>
          <Container
            orientation='horizontal'
            onDrop={onColumnDrop}
            dragHandleSelector='.column-drag-handle'
            dropPlaceholder={{
              // @ts-ignore
              animationDuration: 150,
              showOnTop: true,
              className: 'column bg-[#C9CCD9] rounded p-2 mr-4 w-[272px]',
            }}
            getChildPayload={(index) => columns[index]}
          >
            {columns.map((column: ColumnType) => (
              // @ts-ignore
              <Draggable key={column.id}>
                <Column
                  column={column}
                  key={column.id}
                  onCardDrop={onCardDrop}
                />
              </Draggable>
            ))}
          </Container>
        </div>
      </Scrollbars>
    </div>
  );
};

export default Kanban;
