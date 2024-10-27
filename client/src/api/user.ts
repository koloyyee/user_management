import { del, get, post, put } from "./fetch";

async function save(newUser: FormData) {
	console.log(Object.fromEntries(newUser));
	const keys = ["email", "firstName", "lastName", "password"];
	const keysValid = keys.every(key => newUser.has(key))
	const valuesValid = keys.every(key => newUser.get(key) !== null || newUser.get(key) !== "");
	if (!valuesValid || !keysValid) return;

	newUser.append("role", "user");

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

	const keys = ["_id", "email", "firstName", "lastName", "password"];
	const keysValid = keys.every(key => user.has(key))
	const valuesValid = keys.every(key => user.get(key) !== null || user.get(key) !== "");

	if (!valuesValid || !keysValid) return;

	const _id = user.get("_id");

	const res = await put("/users/" + _id, user);
	const data = await res.json();
	return data;
}

export { delByOid, findAll, findByOid, save, update };

