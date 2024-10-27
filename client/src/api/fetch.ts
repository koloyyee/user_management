import { getSession } from "./auth";

const entry = import.meta.env.VITE_BACKEND_API;



export async function get(api: string) {
  const session = await getSession();
  const res = await fetch(entry + api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session
    },
  });

  return res;
}

export async function post<T>(api: string, body: T) {

  const session = await getSession();
  return await fetch(entry + api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session,
    },
    body: JSON.stringify(body)
  });
}

export async function put<T>(api: string, body: T) {
  const session = await getSession();
  return await fetch(entry + api, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session,
    },
    body: JSON.stringify(body)
  });
}

export async function del(api: string) {
  const session = await getSession();
  return await fetch(entry + api, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session,
    },
  });
}
