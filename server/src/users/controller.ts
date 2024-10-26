import express from "express";
import { ObjectId } from "mongodb";
import { passwordEncoder } from "../utils/password-encoder";
import { checkSession } from "../utils/validation";
import { userService } from "./service";

interface IAuthRequest {
  password: string;
  email: string;
}

export const userRouter = express.Router();
// root "/api/users"
userRouter.route("/")
  //get all users
  .get(checkSession, async (_req, res) => {
    const result = await userService.findAll();
    if (!result) {
      res.status(500).json({users: null, message: "failed to fetch users"});
      return;
    }
    res.status(200).json({ users: result });
  })
  // create user
  .post(async (req, res) => {
    const doc = req.body as IUser;
    const result = await userService.save(doc);
    if (!result) {
      res.status(500).json({ message: "failed to save", result: null });
      return;
    }
    res.status(200).json({ message: "new user created", result });

  })



// endpoint handles with "by id" path params.
userRouter.route("/:id")
  .get(checkSession, async (req, res) => {
    const id = await req.params.id as string;
    const oid = new ObjectId(id);
    const result = await userService.find(oid)
    if(!result)  {
      res.status(500).json({result: null, message: "failed to find, verify the id"});
    }
    res.status(200).json({ user: result, message: "fetch success"});
  })
  .put(checkSession, async (req, res) => {
    const oid = new ObjectId(req.params.id);
    const result = await userService.update(oid, req.body);
    if (result === null) {
      res.status(500).json({result, message: "failed to find, verify the id"});
      return;
    }
    res.status(200).json({result, message: "update success"});
  })
  .delete(checkSession, async (req, res) => {
    const oid = new ObjectId(req.params.id);
    console.log(oid)
    const result = await userService.del(oid);
    if (result === null) {
      res.status(500).json({result: null, message: "failed to find, verify the id"});
      return;
    }
    res.status(200).json({result: result, message: "delete success"});
  })


/**
 * Handle Authorization, session based authorization.
 */
userRouter.route("/login").post(async (req, res) => {
  // check credential
  const body = await req.body as IAuthRequest;
  const user = await userService.findByEmail(body.email);

  if (user === null) {
    res.status(404).json({ message: "User email not found." });
  }
  const verified = await passwordEncoder.verify(body.password, user?.password ?? "");
  if (!verified) {
    res.status(401).json({ message: "Password or Email is incorrect." });
    return;
  }
  delete user.password;
  console.log("Login session: " + req.sessionID)
  res.status(200).json({ user, sessionID: req.sessionID });

  await userService.updateSession(user.email, req.sessionID)

})

userRouter.route("/logout").post(async (req, res) => {
  await userService.updateSession(req.body.email, "")
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout." });
    }
    return res.status(200).json({ message: "Logged out successfully." });
  });
})

userRouter.route("/validate_session").post(async (req, res) => {
  const currentSessionID = await userService.getSession(req.body.sessionID);
  if (!currentSessionID?.sessionID) {
    res.status(401).json({ valid: false, message: "session expired or invalid." });
    return;
  }
  res.status(200).json({ valid: true, message: "session is valid" });
});
