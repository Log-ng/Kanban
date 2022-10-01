import React, {useState} from 'react';
import Card from './Card';
import { AiOutlinePlus } from 'react-icons/ai';
import { CardType, ColumnType } from 'shared/types/kanban';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  column: ColumnType;
}

const Board: React.FC<Props> = (props) => {
  props.column.cards.sort((a: CardType, b: CardType) => {
    return (
      props.column.cardOrder.indexOf(a.id) - props.column.cardOrder.indexOf(b.id)
    );
  })
  const [column, setColumn] = useState<ColumnType>(props.column);


  return (
    <div className='column w-[272px] bg-[#ebecf0] rounded p-2 mr-4'>
      <header className='font-semibold p-2 '>{column.title}</header>
      <Scrollbars style={{ height: '60vh' }}>
        {column.cards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </Scrollbars>

      <div className='flex px-2 py-1'>
        <AiOutlinePlus size={20} color='gray' />
        <div className='text-gray-500 ml-1'>Add new card</div>
      </div>
    </div>
  );
};

export default Board;
