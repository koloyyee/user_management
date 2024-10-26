import { NextFunction, Request, Response } from "express";
import { userService } from "../users/service";

/**
 * Validating request body.
 * return { data, err }
 */
function email(email: string | null | undefined): { email: string, err: null | string } {
  if (!email || email.trim().length === 0) {
    return { email: "", err: "email must have value" };
  }
  if (email.split("@")?.length !== 2) {
    return { email, err: "email should be an email" };
  }
  return { email, err: null };
}

function password(password: string | null | undefined): { password: string, err: null | string } {
  if (!password || password.trim().length === 0) {
    return { password: "", err: "Password must have value." };
  }
  if (password.trim().length <= 8) {
    return { password, err: "Password length must be over 8" };
  }
  return { password, err: null };
}

function name(name: string | null | undefined, { firstName = true }): { name: string, err: null | string } {
  const field = firstName ? "First" : "Last";

  if (!name || name.trim().length === 0) {
    return { name: "", err: field + " must have value." };
  }
  return { name, err: null };
}



export const userValidate = {
  email,
  password,
  name,
}


export function checkSession(req: Request, res: Response, next: NextFunction) {
  const whitelist = ["/login", "/logout", "/validate_session", "/invalidate_session"];
  if (whitelist.some(path => path === req.path)) {
    next();
  }

  const session = req.headers.authorization?.split(" ")[1];
  if (!session) return;
  userService.getSession(session)
    .then(res => res?.sessionID)
    .then(storedSession => {
      console.log("stored: " + storedSession);
      console.log("out: " + session);
      if (storedSession === session) {
        next();
      } else {
        res.status(401).send({ message: "Please login again." })
      }

    })
  //  the authorization made with "Bearer xxxxxxx", split by " " and extract the session Id.
}
