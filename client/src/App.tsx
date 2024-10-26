import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getSession } from './api/auth';
import { findAll } from './api/user';
import './App.css';
import { IUser } from './model/user';

export async function action() {

  return null;
}

export async function loader() {
  const session = await getSession();
  return { session };
}

function App() {
  // checking if the current page has seession, also matches the server.
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(true);
  const session = useLoaderData() as string | undefined;

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [navigate])

  const user = JSON.parse(localStorage.getItem("user") ?? "");
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    if (user.role === "admin") {
      setLoading(true);
      findAll()
        .then(data => {
          const excludeSelf = data.users.filter(u => u.email !== user.email);
          setUsers(excludeSelf)
          setLoading(false)
        })
        .catch(err => console.error(err));
    }
  }, [user.role])



  return (
    <>
      <h1> Welcome back! {user.firstName + " " + user.lastName} </h1>
      <button type="button" onClick={()=> navigate("/users/create")} >✚</button>
      {isLoading ?
        "Loading" :
        <div>
          <p>Total users: {users.length}</p>
          <table>
            <thead>
              <tr>
                <td>User email</td>
                <td> User First Name </td>
                <td> User Last Name  </td>
                <td> Edit User </td>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.email + u.firstName} >
                  <td > {u.email}</td>
                  <td> {u.firstName}</td>
                  <td> {u.lastName}</td>
                  <td> <a href={"/users/" + u._id}> 🖊️</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </>
  )
}

export default App
