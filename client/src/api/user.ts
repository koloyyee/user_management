import { del, get, post, put } from "./fetch";

async function save(newUser: FormData) {
	
	// basic checks for empty or null, and make sure have the correct keys.
	const keys = ["email", "firstName", "lastName", "password", "role"];
	const keysValid = keys.every(key => newUser.has(key))
	const valuesValid = keys.every(key => newUser.get(key) !== null && newUser.get(key) !== "");
	if (!valuesValid || !keysValid) return;

	newUser.append("role", "regular_user");

	const res = await post("/users", Object.fromEntries(newUser));
	return await res.json();
}

async function findAll() {
	const res = await get("/users")
	return await res.json();
}

async function findByOid(oid: string) {
	const res = await get("/users/" + oid)
	const data = await res.json();
	return data;
}

async function delByOid(oid: string) {
	if (oid === "") return;
	const res = await del("/users/" + oid);
	const data = await res.json();
	return data;
}

async function update(user: FormData) {

	// basic checks for empty or null, and make sure have the correct keys.
	const keys = ["_id", "email", "firstName", "lastName", "password", "role"];
	const keysValid = keys.every(key => user.has(key))
	const valuesValid = keys.every(key => user.get(key) !== null && user.get(key) !== "");

	if (!valuesValid || !keysValid) return;

	const _id = user.get("_id");
	console.log(Object.fromEntries(user))
	const res = await put("/users/" + _id, Object.fromEntries(user));
	const data = await res.json();
	console.log(data)
	return data;
}

export { delByOid, findAll, findByOid, save, update };

