/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import AuthContext from './components/contexts';
import { getUserData } from './components/api/ApiProvider';
import { actions } from './redux/homePageSlice.js';

const App = () => {
  const token = localStorage.getItem('token');
  const [isAuth, setIsAuth] = useState(!!token);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const { setAllData } = actions;
      const data = await getUserData(token);
      dispatch(setAllData(data));
    };
    if (isAuth) getData();
  }, [isAuth, token]);

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
