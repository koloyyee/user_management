import express from "express";
import { ObjectId } from "mongodb";
import { passwordEncoder } from "../utils/password-encoder";
import { userService } from "./service";

interface IAuthRequest {
	password: string;
	email: string;
}


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
		const doc = req.body as IUser;
		const result = await userService.save(doc);
		res.status(200).send({ message: "received", result });
	})

userRouter.route("/login").post(async (req, res) => {
	// check credential
	const body = await req.body as IAuthRequest;
	const user = await userService.findByEmail(body.email);
	if (user === null) {
		res.status(404).send({ message: "User email not found." });
	}
	const verified = await passwordEncoder.verify(body.password, user?.password ?? "");
	if (!verified) {
		res.status(401).send({ message: "Password or Email is incorrect." });
		return;
	}
	res.status(200).json({ message: "success" });
})
userRouter.route("/logout").post(async (_req, _res) => {
	// clear session?
})

// endpoint handles with "by id" path params.
userRouter.route("/:id")
	.get(async (req, res) => {
		const id = await req.params.id as string;
		const oid = new ObjectId(id);
		const user = await userService.find(oid)
		console.log(user);
		res.status(200).send(user);
	})
	.put(async (req, res) => {
		const oid = new ObjectId(req.params.id);
		const result = await userService.update(oid, req.body);
		if (result === null) {
			res.status(500);
			return;
		}
		res.status(200).send(result);
	})
	.delete(async (req, res) => {
		const oid = new ObjectId(req.params.id);
		const result = await userService.del(oid);
		if (result === null) {
			res.status(500);
			return;
		}
		res.status(200).send(result);
	})