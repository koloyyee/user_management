import { useEffect, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
import { getSession } from './api/auth';

export async function action() {

  return null;
}

export async function loader() {

  return null;
}

function App() {
  // checking if the current page has seession, also matches the server.
  const navigate = useNavigate();
  useEffect(() => {
    if (!getSession()) {
      navigate("/");
    }
  }, [navigate])

  return (
    <>
      if user is an admin show a list of other users,
      else just say welcome to the logged in user.
    </>
  )
}

export default App
