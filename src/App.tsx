import React from 'react';
import Login from './pages/login';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/not.found';
import SignUp from './pages/sign.up';
import Home from './pages/home';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
