import Header from 'components/header';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMySelector } from 'redux/hooks';
import { appRouters } from 'shared/urlResources';
import { motion } from 'framer-motion';
import Kanban from 'components/kanban';

const Main: React.FC = () => {
  const isLogin = useMySelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate(`..${appRouters.LINK_TO_HOME_PAGE}`);
  }, []);

  return (
    <div className='scale-x-95'>
      <Header />
      <motion.div
        initial={{ x: '-100px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div>
          <Kanban/>
        </div>
      </motion.div>
    </div>
  );
};

export default Main;
