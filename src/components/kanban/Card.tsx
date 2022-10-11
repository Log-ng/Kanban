import React, { useState, useRef } from 'react';
import { CardType } from 'shared/types/kanban';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';
import ContentEditable from 'react-contenteditable';
import MemberTag from './MemberTag';
interface Props {
  card: CardType;
}

const Card: React.FC<Props> = (props) => {
  const { card } = props;
  

  const [isModal, setIsModal] = useState<boolean>(false);
  const titleUpdateRef = useRef(card.title);
  const priorityUpdateRef = useRef(card.priority ?? 'None');
  const descriptionUpdateRef = useRef(card.description);

  const handleBlur = () => {
    console.log(titleUpdateRef.current);
  };
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      // marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#68589b',
      // border: 'solid #68589b 5px',
    },
  };

  const closeModal = () => {
    setIsModal(false);
  };

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
                  onBlur={handleBlur}
                  onChange={(e) => {
                    titleUpdateRef.current = e.target.value;
                  }}
                />
              </div>
              <div className='px-6 py-2'>
                <p className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                  Created by:
                </p>
                <ul className='my-4 space-y-3'>
                  <li className='w-[300px]'>
                    <div className='flex items-center text-base font-bold text-gray-900'>
                      <span className='flex-1 whitespace-nowrap'>
                        Priority:
                      </span>
                      <ContentEditable
                        className='inline-flex items-center justify-center px-3 py-1 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400'
                        html={priorityUpdateRef.current}
                        onBlur={handleBlur}
                        onChange={(e) => {
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
                        onBlur={handleBlur}
                        onChange={(e) => {
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
                  <li>
                    <p className='text-xs italic font-normal text-gray-500 dark:text-gray-400'>
                      ( Click any fields to update )
                    </p>
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
