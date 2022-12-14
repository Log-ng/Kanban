import React from 'react';
import Login from './pages/login';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/notFound';
import SignUp from './pages/signUp';
import Home from './pages/home';
import { AnimatePresence } from 'framer-motion';
import { appRouters } from 'shared/urlResources';
import Main from 'pages/main';
import Profile from 'pages/profile';
import UserList from 'pages/userList';
import Board from 'pages/board';

const App = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route path={appRouters.LINK_TO_HOME_PAGE} element={<Home />} />
        <Route path={appRouters.LINK_TO_MAIN_PAGE} element={<Main />} />
        <Route path={`/${appRouters.LINK_TO_MAIN_PAGE}/:slug`} element={<Board />} />
        <Route path={`/${appRouters.LINK_TO_LOGIN_PAGE}`} element={<Login />} />
        <Route path={appRouters.LINK_TO_PROFILE_PAGE} element={<Profile />} />
        <Route path={`/${appRouters.LINK_TO_SIGN_UP_PAGE}`} element={<SignUp />}/>
        <Route path={`/${appRouters.LINK_TO_USER_LIST}`} element={<UserList />}/>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
