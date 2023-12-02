// src/main.jsx
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';

// Import the CreateEvent component from the correct directory
import CreateEvent from './components/EventCreate';

// Import the Event component
import Event from './pages/Event';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/create-event',
        element: <CreateEvent />,
      },
      {
        // Add a route for viewing a specific event
        path: '/event/:eventId',
        element: <Event />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
