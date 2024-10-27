import { useState } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import "./user/form-body.css";

export async function loader() {
  localStorage.clear();
  return null;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (!data) return null;

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const res = await login({ email, password });
  if (res?.err) {
    console.error(res.err)
    return res.err;
  }

  return redirect("/");
}


export default function Login() {

  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function sampleLogin() {
    setLoading(true);
    const res = await login({ email: "another@email.com", password: "passwordpassword" })
    if (res?.err) {
      console.error(res.err)
      return res.err;
    }
    setLoading(false);
    return navigate("/");
  }
  return (
    <>
      {isLoading ?
        <h3 className="loading spin"> Loading</h3>
        :
        <Form method="POST">
          <div className="form-row">
            <label htmlFor="email"> Email </label>
            <input type="text" name="email" id="email" />
          </div>
          <div className="form-row">
            <label htmlFor="password"> Password </label>
            <input type="password" name="password" id="password" />
          </div>

          <div className="form-row">
            <button type="submit"> Login </button>
            <button type="button" onClick={sampleLogin}> Sample Account</button>
          </div>
        </Form>

      }
    </>
  );
}
