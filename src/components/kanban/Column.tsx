import React from 'react';
import Card from './Card';
import { AiOutlinePlus } from 'react-icons/ai';
import { CardType, ColumnType } from 'shared/types/kanban';
import { Scrollbars } from 'react-custom-scrollbars';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';

interface Props {
  column: ColumnType;
  onCardDrop: (columnId: string, dropResult: DropResult) => void;
}

const Board: React.FC<Props> = (props) => {
  const { onCardDrop, column } = props;
  column.cards.sort((a: CardType, b: CardType) => {
    return column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id);
  });

  return (
    <div className='column w-[272px] bg-[#ebecf0] rounded p-2 mr-4'>
      <header className='column-drag-handle font-semibold p-2 cursor-pointer'>
        {column.title}
      </header>
      <Scrollbars style={{ height: '60vh' }} autoHeightMax={'60vh'}>
        <Container
          groupName='col'
          orientation='vertical'
          // @ts-ignore
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          dropPlaceholder={{
            // @ts-ignore
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview rounded-lg bg-[#bcb4d8] mb-2',
          }}
          dragClass='ease-[0.18s]'
          dropClass=''
          getChildPayload={(index) => column.cards[index]}
        >
          {column.cards.map((card) => (
            // @ts-ignore
            <Draggable key={card.id}>
              <Card card={card} key={card.id}/>
            </Draggable>
          ))}
        </Container>
      </Scrollbars>

      <div className='flex px-2 py-1 cursor-pointer hover:bg-[#C9CCD9] transition-all rounded mt-1'>
        <AiOutlinePlus size={20} color='gray' />
        <div className='text-gray-500 ml-1'>Add new card</div>
      </div>
    </div>
  );
};

export default Board;
