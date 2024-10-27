import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App, { action as appAction, loader as appLoader } from './App';
import { ErrorPage } from './error-page';
import './index.css';
import Login, { action as loginAction, loader as loginLoader } from './routes/login';
import Root from './routes/root';
import CreateUser, { action as createAction } from './routes/user/create';
import UserDetail, { action as detailAction, loader as detailLoader } from './routes/user/detail';


const router = createBrowserRouter([
  {
    path: "/*",
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
    loader: loginLoader,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
        action: appAction,
        loader: appLoader,
      },


      {
        path: "/users",
        children: [
          {
            path: ":oid",
            element: <UserDetail />,
            action: detailAction,
            loader: detailLoader,
          },
          {
            path: "create",
            element: <CreateUser />,
            action: createAction,
            // loader: detailLoader,
          }
        ]
      },

    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
