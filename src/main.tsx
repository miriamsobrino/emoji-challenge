import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Welcome from './pages/Welcome.tsx';
import Layout from './Layout.tsx';
import Home from './pages/Home.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import Ranking from './pages/Ranking.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Welcome />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/ranking',
        element: <Ranking />,
      },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
