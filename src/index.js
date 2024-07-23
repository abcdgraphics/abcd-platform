import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Body from './components/body/Body';
import Projects from './components/pages/Projects';
import Files from './components/pages/Files';
import Messages from './components/pages/Messages';
import Payments from './components/pages/Payments';
import Reports from './components/pages/Reports';
import TicketSystem from './components/pages/TicketSystem';
import Settings from './components/pages/Settings';
import Profile from './components/pages/Profile';
import CreateTicket from './components/pages/CreateTicket';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import PrivateRoute from './components/body/private-route';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute element={App} />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/files',
        element: <Files />,
      },
      {
        path: '/messages',
        element: <Messages />,
      },
      {
        path: '/payments',
        element: <Payments />,
      },
      {
        path: '/reports',
        element: <Reports />,
      },
      {
        path: '/support-ticket',
        element: <TicketSystem />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/user-profile',
        element: <Profile />,
      },
      {
        path: '/create-ticket',
        element: <CreateTicket />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='980827678614-0ed2bgu6laf10l262cs9a8eoe074di87.apps.googleusercontent.com'>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
