import React from 'react';
import Login from './pages/login';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/not.found';
import SignUp from './pages/sign.up';
import Home from './pages/home';
import { AnimatePresence } from 'framer-motion';
import { appRouters } from 'shared/url.resources';
import Main from 'pages/main';

const App = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route path={appRouters.LINK_TO_HOME_PAGE} element={<Home />} />
        <Route path={appRouters.LINK_TO_MAIN_PAGE} element={<Main />} />
        <Route path={`/${appRouters.LINK_TO_LOGIN_PAGE}`} element={<Login />} />
        <Route path={`/${appRouters.LINK_TO_SIGN_UP_PAGE}`} element={<SignUp />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
