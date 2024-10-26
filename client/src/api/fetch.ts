import { getSession } from "./auth";

const entry = import.meta.env.VITE_BACKEND_API;



export async function get(api: string) {
  const session = getSession();
  await fetch(entry + api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session
    }
  });
}

export async function post<T extends BodyInit | null | undefined>(api: string, body: T) {
  const session = getSession();
  await fetch(entry + api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session,
    },
    body: body
  });
}
