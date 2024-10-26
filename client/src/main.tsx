import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App, { action as appAction, loader as appLoader } from './App';
import { ErrorPage } from './error-page';
import './index.css';
import Login, { action as loginAction, loader as loginLoader } from './routes/login';
import CreateUser, { action as createAction } from './routes/user/create';
import UserDetail, { action as detailAction, loader as detailLoader } from './routes/user/detail';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    action: appAction,
    loader: appLoader,
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction,
    loader: loginLoader,
  },

  {
    path: "/users",
    children: [
      {
        path: ":oid",
        element: <UserDetail />,
        errorElement: <ErrorPage />,
        action: detailAction,
        loader: detailLoader,
      },
      {
        path: "create",
        element: <CreateUser/>,
        errorElement: <ErrorPage />,
        action: createAction,
        // loader: detailLoader,
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
