/**
 * Validating request body.
 * return { data, err }
 */
function username(username: string) {
	if (username === null || username.trim().length === 0) {
		return { username, err: "Username must have value" };
	}
	if (username.split("@")?.length !== 2) {
		return { username, err: "Username should be an email" };
	}
	return { username, err: null };
}

function password(password: string) {
	if (password === null || password.trim().length === 0) {
		return { password, err: "Password must have value." };
	}
	if (password.trim().length <= 8) {
		return { password, err: "Password length must be over 8" };
	}
	return { password, err: null };
}

function name(name: string, { firstName = true }) {
	const field = firstName ? "First" : "Last";

	if (name === null || name.trim().length === 0) {
		return { name, err: firstName ? field + " must have value." };
	}
	return { name, err: null };
}

export const userValidate = {
	username,
	password,
	name,
}