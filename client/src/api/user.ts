import { IUser } from "../model/user";
import { del, get, put } from "./fetch";

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
	const res = await del("/users/"+ oid);
	const data = await res.json();
	return data;
}

async function update(user: IUser) {
	const res = await put("/users/"+ user._id, user);
	const data = await res.json();
	return data;
}

export { delByOid, findAll, findByOid, update };

