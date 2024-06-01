import Loader from './components/layout/Loader';
import { Suspense } from 'react';
import routes from '~react-pages';
import useDirection from './hooks/useDirection';
import { useRoutes } from 'react-router-dom';
import Router from './routes';

function App() {
  useDirection();

  return (
    <Router />
  );
}

export default App;
