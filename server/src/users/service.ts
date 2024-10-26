/**
 * Abstraction layer for querying MongoDB
 * Dependency Inversion Principle.
 */

import { ObjectId } from "mongodb";
import { usersColl } from "../db/mongo";
import { passwordEncoder } from "../utils/password-encoder";
import { userValidate } from "../utils/validation";

async function findAll() {
	const collection = await usersColl();
	return await collection.find({}).toArray();
}

async function save(doc: IUser) {
	const { password, err } = userValidate.password(doc.password);
	if (err !== null) {
		console.error(err);
	};
	const hashed = await passwordEncoder.encode(password);
	const data = {...doc, password: hashed};

	const collection = await usersColl();
	return await collection.insertOne(data);
}

async function existed(oid : ObjectId) {
	// check the mongodb doc
	const collection = await usersColl();
	return await collection.findOne({ _id: oid })
}

async function findByEmail(email: string ){
	const collection = await usersColl();
	return await collection.findOne({ email}) as unknown as IUser;
}

export const userService = {
	findAll,
	save,
	existed,
	findByEmail
}
