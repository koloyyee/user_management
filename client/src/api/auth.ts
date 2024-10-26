import { AuthenticationException } from "../utils/exceptions";

const entry = import.meta.env.VITE_BACKEND_API;

interface IValidateSession {
  valid: boolean;
  message: string;
}

export interface IAuthRequest {
  email: string;
  password: string;
}

async function getSession(): Promise<string| undefined> {
  const session = JSON.parse(JSON.stringify(localStorage.getItem("session")));
  if (!session) {
    window.location.href = "/login";
    return;
  }
  return session;
}

async function destroySession() {

  await fetch(entry + "/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
  });

  localStorage.clear();
  window.location.href = "/login";
}


async function login(authReq: IAuthRequest) {
  try {
    const res = await fetch(entry + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authReq)
    });

    const json = await res.json();
    if (json.sessionID) {
      localStorage.setItem("session", json.sessionID);
      localStorage.setItem("user", JSON.stringify(json.user));

      return { user: json.user, err: null };
    }
    return { user: null, err: new AuthenticationException("Authentication failed, please check your email and/or password is valid.") };
  } catch (e) {
    if (e instanceof Error)
      throw new AuthenticationException(e.message);
  }
}

async function logout() {
  destroySession();
}

export {
  destroySession, getSession, login,
  logout
};

