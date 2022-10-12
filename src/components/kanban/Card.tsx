import React, { useState, useRef, useEffect } from 'react';
import { CardRequest, CardType } from 'shared/types/kanban';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';
import ContentEditable from 'react-contenteditable';
import MemberTag from './MemberTag';
import { deleteCardService, getSingleCard, updateCardService } from './services';
import { appRouters, CONTROLLER_DELETE_CARD, CONTROLLER_UPDATE_CARD } from 'shared/urlServices';
import { useMyDispatch } from 'redux/hooks';
import { logoutLocal } from 'redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { confirmDeleteCard } from './utils';
interface Props {
  card: CardType;
  deleteCard: (cardId: string) => void;
  order: number
}


const Card: React.FC<Props> = (props) => {
  const { deleteCard, order } = props;
  
  const [card, setCard] = useState<CardType>(props.card);
  const [isModal, setIsModal] = useState<boolean>(false);
  const titleUpdateRef = useRef(card.title);
  const priorityUpdateRef = useRef(card.priority ?? '');
  const descriptionUpdateRef = useRef(card.description);

  const dispatch = useMyDispatch();
  const navigate = useNavigate();
  const onExpired = () => {
    dispatch(logoutLocal());
    navigate(`../${appRouters.LINK_TO_LOGIN_PAGE}`);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#68589b',
    },
  };

  useEffect(() => {
    if(!isModal) return;
    getSingleCard(card.boardId, card.id)
      .then((res) => {
        titleUpdateRef.current = res.data.card?.title ?? '';
        priorityUpdateRef.current = res.data.card?.priority ?? '' 
        descriptionUpdateRef.current = res.data.card?.title ?? '';
        setCard(res.data.card ?? card);
      })
      .catch(() => onExpired());
  }, [isModal]);
  

  const closeModal = () => {
    const cardRequest: CardRequest = {
      controller: CONTROLLER_UPDATE_CARD,
      cardId: card.id,
      boardId: card.boardId,
      title: titleUpdateRef.current,
      priority: priorityUpdateRef.current,
      description: descriptionUpdateRef.current
    };
    setCard({
      ...card,
      title: titleUpdateRef.current,
      priority: priorityUpdateRef.current,
      description: descriptionUpdateRef.current
    });
    updateCardService(cardRequest).catch(() => onExpired);
    
    setIsModal(false);
  };

  const onDeleteCard = () => {
    deleteCard(card.id);

    const cardRequest: CardRequest = {
      controller: CONTROLLER_DELETE_CARD,
      boardId: card.boardId,
      cardId: card.id,
      columnId: card.columnId,
      order: order
    }
    deleteCardService(cardRequest).catch(() => onExpired());
  }
  return (
    <>
      <article
        onClick={() => setIsModal(true)}
        className='bg-white shadow shadow-slate-400 mb-2 rounded-md p-2 w-64 break-all cursor-pointer'
      >
        {card.title}
      </article>
      <Modal
        isOpen={isModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className='w-full shadow'>
          <div className='w-[800px] h-full'>
            <div className='relative bg-white rounded-md  dark:bg-gray-700'>
              <button
                type='button'
                onClick={closeModal}
                className='transition-all absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
              >
                <GrClose />
              </button>
              <div className='py-4 px-6 rounded-t border-b dark:border-gray-600'>
                <ContentEditable
                  className='text-base font-semibold text-gray-900 lg:text-xl dark:text-white p-2 mr-6'
                  html={titleUpdateRef.current}
                  onChange={(e) => {
                    if (e.target.value === '') return;
                    titleUpdateRef.current = e.target.value;
                  }}
                />
              </div>
              <div className='px-6 py-2'>
                <ul className='my-4 space-y-3'>
                  <li className='w-[300px]'>
                    <div className='flex items-center text-base font-bold text-gray-900'>
                      <span className='flex-1 whitespace-nowrap'>
                        Priority:
                      </span>
                      <ContentEditable
                        className='inline-flex items-center justify-center px-3 py-1 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400'
                        html={priorityUpdateRef.current}
                        onChange={(e) => {
                          if (e.target.value === '') return;
                          priorityUpdateRef.current = e.target.value;
                        }}
                      />
                    </div>
                  </li>
                  <li>
                    <div className='p-3 text-base  text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white'>
                      <div className='flex-1 ml-3 break-words font-bold'>
                        Description:
                      </div>
                      <ContentEditable
                        className='flex-2 ml-3 break-words text-sm py-2'
                        html={descriptionUpdateRef.current}
                        onChange={(e) => {
                          if (e.target.value === '') return;
                          descriptionUpdateRef.current = e.target.value;
                        }}
                      />
                    </div>
                  </li>
                  <li>
                    <div className='items-center p-3 text-base  text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white'>
                      <div className='ml-3 font-bold'>Member:</div>
                      <div className='ml-3'>
                        <MemberTag />
                      </div>
                    </div>
                  </li>
                  <li className='flex justify-around'>
                    <p className='text-xs italic font-normal text-gray-500 dark:text-gray-400 pt-4 tracking-wide'>
                      ( *Click any fields to update )
                    </p>
                    <button
                      className='transition-all bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                      onClick={() => confirmDeleteCard(onDeleteCard)}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Card;
