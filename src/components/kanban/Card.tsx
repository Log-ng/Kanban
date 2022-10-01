import React from 'react';
import { CardType } from 'shared/types/kanban';

interface Props {
  card: CardType;
}

const Card: React.FC<Props> = (props) => {
  const {card} = props;

  return (
    <article className='bg-white shadow-md shadow-slate-400 mb-2 rounded-md p-2 w-64 break-all'>
      {card.title}
    </article>
  );
};

export default Card;
