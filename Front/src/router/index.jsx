import Home from '../pages/Home/Home.jsx';
import Login from '../pages/Login/Login.jsx';
import MainLayout from '../layouts/MainLayout.jsx';
import Memberships from '../pages/Memberships/Memberships.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'membresias',
                element: <Memberships />,
            },
            {
                path: "*",
                element: <NotFound />
            }
        ],
    },
]);
