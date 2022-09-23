import React from 'react';
import Login from './pages/login';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/not.found';
import SignUp from './pages/sign.up';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
