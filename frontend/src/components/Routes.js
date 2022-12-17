import Home from './Home/Home';
import Login from './Login/Login';

export default [
  { path: '/login', element: <Login /> },
  { path: '/', element: <Home /> },
  { path: '/*', element: <h1>Error 404 Page not found</h1> },
];
