/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext, socket, SocketContext } from './components/contexts';
import { getUserData } from './components/api/ApiProvider';
import { actions } from './redux/homePageSlice.js';
import PageRoutes from './PageRoutes';

const App = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username') ?? 'guest';
  const [isAuth, setIsAuth] = useState(!!token);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const { setAllData } = actions;
      const data = await getUserData(token);
      dispatch(setAllData(data));
    };
    if (isAuth) getData();
  }, [isAuth]);

  const authData = { isAuth, setIsAuth, username };

  return (
    <AuthContext.Provider value={authData}>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <div className="d-flex flex-column h-100 bg-light">
            <PageRoutes />
          </div>
        </BrowserRouter>
      </SocketContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
