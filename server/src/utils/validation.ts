import { NextFunction, Request, Response } from "express";

/**
 * Validating request body.
 * return { data, err }
 */
function email(email: string | null | undefined): { email: string , err: null | string } {
	if (!email || email.trim().length === 0) {
		return { email : "", err: "email must have value" };
	}
	if (email.split("@")?.length !== 2) {
		return { email, err: "email should be an email" };
	}
	return { email, err: null };
}

function password(password: string | null | undefined): { password: string , err: null | string } {
	if (!password || password.trim().length === 0) {
		return { password: "" , err: "Password must have value." };
	}
	if (password.trim().length <= 8) {
		return { password, err: "Password length must be over 8" };
	}
	return { password, err: null };
}

function name(name: string | null | undefined, { firstName = true }): { name: string, err: null | string } {
	const field = firstName ? "First" : "Last";

	if (!name || name.trim().length === 0) {
		return { name: "" , err: field + " must have value." };
	}
	return { name, err: null };
}



export const userValidate = {
	email,
	password,
	name,
}


export function checkSession(req: Request, res: Response, next :NextFunction) {
	//  the authroization made with "Bearer xxxxxxx", split by " " and extract the session Id.
	const session = req.headers.authorization?.split(" ")[1];
	if(req.sessionID === session) {
		console.log(req.headers.authorization);
		next();
	} else {
		res.status(401).send({ message : ""})
	} 
}