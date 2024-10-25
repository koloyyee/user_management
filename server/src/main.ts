import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import dotenv from "dotenv";
import { userRouter } from "./users/controller";

// get env variables
dotenv.config();

const app = express();

/**
 * middlewares 
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routing
 */
app.use("/api/users", userRouter);

/**
 * Sanity check.
 */
app.get("/api", async (_req, res) => {
  res.status(200).send({ message: "hello there!" });
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
