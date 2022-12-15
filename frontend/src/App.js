import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import AuthContext from './components/contexts';

const App = () => {
  const token = localStorage.getItem('token');
  const [isAuth, setIsAuth] = useState(!!token);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const authData = { isAuth, setIsAuth };
  return (
    <AuthContext.Provider value={authData}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<h1>Error 404 Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
