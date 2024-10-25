/**
 * Abstraction layer for querying MongoDB
 * Dependency Inversion Principle.
 */

import { ObjectId, OptionalId } from "mongodb";
import { usersColl } from "../db/mongo";

async function findAll() {
	const collection = await usersColl();
	return await collection.find({}).toArray();
}

async function save(doc: OptionalId<Document>) {
	console.log({ doc });
	/**
	 * TODO: missing bcrypt
	 */
	const collection = await usersColl();
	return await collection.insertOne(doc);
}

async function existed(oid : ObjectId) {
	// check the mongodb doc
}

export const userService = {
	findAll,
	save
}
