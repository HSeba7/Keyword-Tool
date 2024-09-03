import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '../components/DefaultLayout';
import DashboardFirstPage from '../pages/dashboard/Dashboard';
import PageTwo from '../pages/page_2/PageTwo';
import Counter from '../pages/counter/Counter';
import KeywordStrategy from '../pages/keyword-strategy-tool/KeywordStrategy';
import ProtectedRoute from '../components/ProtectedRoute'; // Import the ProtectedRoute component

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [   
      {
        path: '/',
        element: <ProtectedRoute element={PageTwo} />, // Protect this route
      },
      {
        path: '/filter',
        element: <ProtectedRoute element={KeywordStrategy} />, // Protect this route
      },
      {
        path: '/suggestions',
        element: <ProtectedRoute element={DashboardFirstPage} />, // Protect this route
      },
      {
        path: '/volume',
        element: <ProtectedRoute element={PageTwo} />, // Protect this route
      },
      {
        path: '/text-counter',
        element: <ProtectedRoute element={Counter} />, // Protect this route
      },
    ],
  },
  {
    path: '*',
    element: <PageTwo />,
  },
]);

export default router;
