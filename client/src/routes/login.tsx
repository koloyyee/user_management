import { Form, redirect } from "react-router-dom";
import { login } from "../api/auth";

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
  const res = await login({email, password});
  if (res?.err) {
    console.error(res.err)
    return res.err;
  }

  return redirect("/");
}


export default function Login() {

  return (

    <Form method="POST">
      <input type="text" name="email" />
      <input type="password" name="password" />
      <button type="submit"> Login </button>
    </Form>
  );
}
