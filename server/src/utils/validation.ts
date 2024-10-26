/**
 * Validating request body.
 * return { data, err }
 */
function username(username: string | null | undefined): { username: string , err: null | string } {
	if (!username || username.trim().length === 0) {
		return { username : "", err: "Username must have value" };
	}
	if (username.split("@")?.length !== 2) {
		return { username, err: "Username should be an email" };
	}
	return { username, err: null };
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
	username,
	password,
	name,
}