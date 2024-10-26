import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';


const router = createBrowserRouter([
  {
    path : "/",
    element: <App />,
    errorElement: <h1> Oops! Not Found!</h1>
  },

  {
    path : "/login",
    element: <h1> Login Page </h1>,
    errorElement: <h1> Oops! Not Found!</h1>
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router ={router} />
  </StrictMode>,
)
