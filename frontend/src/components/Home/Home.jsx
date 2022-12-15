import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts';

const Home = () => {
  const { isAuth } = useContext(AuthContext);
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      Hello
    </div>
  );
};

export default Home;
