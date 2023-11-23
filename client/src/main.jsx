import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Event from './pages/Event';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            }, {
                path: '/login',
                element: <Login />
            }, {
                path: '/Signup',
                element: <Signup />
            }, {
                path: '/Event',
                element: <Event />
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);