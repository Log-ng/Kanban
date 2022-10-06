import React, { useState, useEffect, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { mockData } from './mockData';
import Column from './Column';
import { BoardType, ColumnType } from 'shared/types/kanban';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { applyDrag } from './utils';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { motion } from 'framer-motion';

const Kanban: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(mockData);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [isAddNewColumn, setIsAddNewColumn] = useState<boolean>(false);
  const [newColumnTitle, setNewColumnTitle] = useState<string>('');
  const inputAddRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mockData.columns.sort((a: ColumnType, b: ColumnType) => {
      return board.columnOrder.indexOf(a.id) - board.columnOrder.indexOf(b.id);
    });
    setColumns(board.columns);
  }, []);

  useEffect(() => {
    const isInputAdded = inputAddRef && inputAddRef.current;

    if (isInputAdded) {
      inputAddRef.current.focus();
    }
  }, [isAddNewColumn]);

  const onColumnDrop = (dropResult: DropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
       setBoard({
         ...board,
         columnOrder: newColumns.map((column) => column.id),
         columns: newColumns,
       });
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

  const addNewColumn = () => {
    if (!newColumnTitle) {
      inputAddRef.current?.focus();
      return;
    }
    const newAddedColumn: ColumnType = {
      id: Date.now().toString(),
      boardId: board.id,
      title: newColumnTitle,
      cards: [],
      cardOrder: []
    } 
    let columnsAfterAdd = [...columns];
    columnsAfterAdd.push(newAddedColumn);

    setColumns(columnsAfterAdd);
    setBoard({
      ...board,
      columnOrder: columnsAfterAdd.map((column) => column.id),
      columns: columnsAfterAdd
    });
    setNewColumnTitle('');

  };

  const updateColumn = (coloumnUpdated: ColumnType, isDeleteColumn: boolean) => {
    let newColumns = [...columns];
    const indexOfColumnUpdate = newColumns.findIndex(
      (columnId) => columnId.id === coloumnUpdated.id
    );

    if (isDeleteColumn) {
      newColumns.splice(indexOfColumnUpdate, 1);
    } else {
      newColumns.splice(indexOfColumnUpdate, 1, coloumnUpdated);
    }

    setColumns(newColumns);
    setBoard({
      ...board,
      columnOrder: newColumns.map((column) => column.id),
      columns: newColumns,
    });
  };
  
  return (
    <div className='h-[85vh] rounded-md bg-[#BCB4D8] px-5'>
      <nav className=''>board bar</nav>
      <Scrollbars style={{ height: '80vh' }}>
        <div className='flex rounded '>
          <Container
            orientation='horizontal'
            onDrop={onColumnDrop}
            dragHandleSelector='.column-drag-handle'
            dropPlaceholder={{
              // @ts-ignore
              animationDuration: 150,
              showOnTop: true,
              className: 'column bg-[#C9CCD9] rounded p-2 mr-6 ml-10',
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
                  updateColumn={updateColumn}
                />
              </Draggable>
            ))}
          </Container>
          {!isAddNewColumn && (
            <motion.div
              initial={{ y: '-100px', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className='add-new-column w-[272px]'
              onClick={() => setIsAddNewColumn(true)}
            >
              <AiOutlinePlus size={25} color='gray' className='pt-1' />
              <div className='text-gray-500 ml-1 pt-1 font-semibold'>
                Add another column
              </div>
            </motion.div>
          )}
          {isAddNewColumn && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className='w-[272px] h-[110px] p-2 rounded bg-[#ebecf0] shadow-md'
            >
              <input
                type='text'
                placeholder='Title...'
                onChange={(e) => setNewColumnTitle(e.target.value)}
                className='shadow block p-2 w-full text-gray-900 bg-gray-50 rounded border-[1.7px] border-[#68589b] font-semibold'
                ref={inputAddRef}
                value={newColumnTitle}
              />
              <div className='flex'>
                <button
                  className='button-add-new-clomn-form'
                  onClick={addNewColumn}
                >
                  Add column
                </button>
                <GrClose
                  onClick={() => setIsAddNewColumn(false)}
                  className='mt-4 ml-6 cursor-pointer hover:scale-110 transition-all'
                  size={20}
                />
              </div>
            </motion.div>
          )}
        </div>
      </Scrollbars>
    </div>
  );
};

export default Kanban;
