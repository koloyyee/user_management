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

async function getSession() {
  const session = JSON.parse(localStorage.get("session"));
  if (!session) {
    window.location.href = "/login";
    return;
  }

  const res = await fetch(entry + "/users/validate_session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ sessionID: session }),
  });

  const json = await res.json() as IValidateSession;
  if (!json.valid) {
    window.location.href = "/login";
    return;
  }

  return session;
}

async function destroySession() {


  const res = await fetch(entry + "/users/invalidate_session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
  });


  localStorage.clear();
  window.location.href = "/login";
}


async function login(authReq: any) {
  // if (authReq === null) return;

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
      localStorage.setItem("user", json.user);

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
  getSession,
  destroySession,
  login,
  logout,
}
