import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { CardType, ColumnType } from 'shared/types/kanban';
import { Scrollbars } from 'react-custom-scrollbars';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { submit } from './utils';

interface Props {
  column: ColumnType;
  onCardDrop: (columnId: string, dropResult: DropResult) => void;
}

const Board: React.FC<Props> = (props) => {
  const { onCardDrop, column } = props;

  const [isUpdateTitle, setIsUpdateTitle] = useState<boolean>(false);
  const [updateTitle, setUpdateTitle] = useState<string>(column.title);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isInputAdded = inputTitleRef && inputTitleRef.current;
    if (isInputAdded) {
      inputTitleRef.current.focus();
    }
  }, [isUpdateTitle]);

  column.cards.sort((a: CardType, b: CardType) => {
    return column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id);
  });

  return (
    <div className='w-[272px] bg-[#ebecf0] rounded p-2 mr-4 shadow-lg'>
      <header className='column-drag-handle font-semibold p-2 cursor-pointer underline'>
        {!isUpdateTitle ? (
          <div className='grid grid-cols-10'>
            <div className='col-span-9' onClick={() => setIsUpdateTitle(true)}>
              {updateTitle}
            </div>
            <GrClose
              onClick={() => submit()}
              className='mt-[2px] cursor-pointer hover:scale-110 transition-all'
              size={20}
            />
          </div>
        ) : (
          <input
            type='text'
            className='shadow block p-[3px]  w-full text-gray-900 bg-gray-50 rounded border-[1px] border-[#68589b] font-semibold'
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            ref={inputTitleRef}
            onBlur={() => setIsUpdateTitle(false)}
          />
        )}
      </header>
      <Scrollbars style={{ height: '60vh' }} autoHeightMax={'60vh'}>
        <Container
          groupName='col'
          orientation='vertical'
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          dropPlaceholder={{
            // @ts-ignore
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview rounded-lg bg-[#bcb4d8] mb-2',
          }}
          dragClass='ease-[0.18s]'
          getChildPayload={(index) => column.cards[index]}
        >
          {column.cards.map((card) => (
            // @ts-ignore
            <Draggable key={card.id}>
              <Card card={card} key={card.id} />
            </Draggable>
          ))}
        </Container>
      </Scrollbars>

      <div className='flex px-2 py-1 cursor-pointer hover:bg-[#C9CCD9] transition-all rounded mt-1'>
        <AiOutlinePlus size={25} color='gray' className='pt-1' />
        <div className='text-gray-500 ml-1 pt-[2px] font-semibold'>
          Add new card
        </div>
      </div>
    </div>
  );
};

export default Board;
