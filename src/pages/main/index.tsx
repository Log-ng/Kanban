import Header from 'components/header';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyDispatch, useMySelector } from 'redux/hooks';
import { appRouters } from 'shared/urlResources';
import { motion } from 'framer-motion';
import BoardTag from './BoardTag';
import { BoardType } from 'shared/types/kanban';
import { getBoards } from './services';
import { logoutLocal } from 'redux/authSlice';

const Main: React.FC = () => {
  const isLogin = useMySelector((state) => state.auth.isLoggedIn);
  const dispatch = useMyDispatch();
  const [boards, setBoards] = useState<BoardType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate(`..${appRouters.LINK_TO_HOME_PAGE}`);
    getBoards()
      .then((res) => {
        if (res.data.status !== 'Success') return;
        setBoards(res.data.boards ?? []);
      })
      .catch(() => {
        dispatch(logoutLocal());
        navigate(`../${appRouters.LINK_TO_LOGIN_PAGE}`);
      });
  }, []);

  return (
    <div className='scale-x-95'>
      <Header />
      <motion.div
        initial={{ x: '-100px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className='max-h-[85vh] h-[85vh] overflow-y-auto rounded-md bg-[#BCB4D8] px-5'>
          <div className='grid grid-cols-4 gap-8 pt-7'>
            {boards.map((board) => (
              <BoardTag key={board.id} board={board} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Main;
