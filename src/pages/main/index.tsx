import Header from 'components/header';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMySelector } from 'redux/hooks';
import { appRouters } from 'shared/urlResources';

const Main: React.FC = () => {
  const isLogin = useMySelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate(`..${appRouters.LINK_TO_HOME_PAGE}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='scale-x-95'>
      <Header />
      <div></div>
    </div>
  );
};

export default Main;
