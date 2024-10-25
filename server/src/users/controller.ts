import express from "express";
import { ObjectId } from "mongodb";
import { conn, usersColl } from "../db/mongo";
import { userService } from "./service";



export const userRouter = express.Router();
// root "/api/users"
userRouter.route("/")
	//get all users
	.get(async (_req, res) => {
		const data = await userService.findAll();
		res.send(data).status(200);
	})
	// create user
	.post(async (req, res) => {
		const collection = await usersColl();
		const doc = req.body;
		const result = await collection.insertOne(doc);
		// const result = await userService.save(req.body);
		res.status(200).send({ message: "received", result });
	})

userRouter.route("/login").post(async( _req, _res) => {
	// check credential
	// create JWT or session
})
userRouter.route("/logout").post(async( _req, _res) => {
	// clear session?
})

// endpoint handles with "by id" path params.
userRouter.route("/:id")
	.get(async (req, res) => {
		console.log(req);
		console.log(res);
	})
	.put( async (req, res) => {
		const db = await conn();
		const collection = await db?.collection("users");
		const oid = new ObjectId(req.params.id);
		const query = { _id: oid };
		const result = await collection.updateOne(query, {
			$set: { 
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email
			}
		});
		res.status(200).send(result);
	})
	.delete(async(req, res) => {
		console.log(req);
		console.log(res);
	})