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
  return await collection.find({}, {projection: {"password" : 0}}).toArray();
}

async function save(doc: IUser) {
  if(await emailExist(doc.email)) {
    return;
  };

  const { password, err } = userValidate.password(doc.password);
  if (err !== null) {
    console.error(err);
  };
  const hashed = await passwordEncoder.encode(password);
  const data = { ...doc, password: hashed, sessionID: ""}; // for immutable consideration.

  const collection = await usersColl();
  return await collection.insertOne(data);
}


async function emailExist (email : string) {
  const collection = await usersColl();
  return await collection.findOne({ email}) !== null;
}

async function existed(oid: ObjectId) {
  const collection = await usersColl();
  return await collection.findOne({ _id: oid })
}

async function findByEmail(email: string) {
  const collection = await usersColl();
  return await collection.findOne({ "email": email }) as unknown as IUser;
}

async function find(oid: ObjectId) {
  const collection = await usersColl();
  // {"password" : 0 } tells MongoDB to exclude the field.
  return await collection.findOne({ _id: oid }, { projection: { "password": 0 } }) as unknown as IUser;
}

async function update(oid: ObjectId, doc: IUser) {

  const collection = await usersColl();
  const query = { _id: oid };

  const fn = userValidate.name(doc.firstName, { firstName: true });
  if (fn.err) return;
  const ln = userValidate.name(doc.lastName, { firstName: false });
  if (ln.err) return;
  const { email, err } = userValidate.email(doc.email);
  if (err) return;

  return await collection.updateOne(query, {
    $set: {
      firstName: fn.name,
      lastName: ln.name,
      email: email
    }
  });
}

async function del(oid: ObjectId) {
  const collection = await usersColl();
  return await collection.findOneAndDelete({ _id: oid })
}

async function updateSession(email: string, sessionID : string) {
  const collection = await usersColl();
  return await collection.updateOne({ email: email}, {
    $set: {
      sessionID: sessionID
    }
  })
}

async function getSession(sessionID: string) {
  const collection = await usersColl();
  return await collection.findOne({ sessionID: sessionID}, {
    projection: {
     "sessionID": 1
    }
  });
}

export const userService = {
  findAll,
  save,
  existed,
  findByEmail,
  find,
  update,
  del,
  updateSession,
  getSession,
}
