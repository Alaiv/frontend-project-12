import { Route, Routes } from 'react-router-dom';
import routes from './components/Routes';

const PageRoutes = () => (
  <Routes>
    {routes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))}
  </Routes>
);

export default PageRoutes;
