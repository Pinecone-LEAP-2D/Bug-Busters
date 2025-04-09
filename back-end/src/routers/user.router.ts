import express from "express";
import { getUser } from "../controller/user/getUser.controller";
import { createUser } from "../controller/user/createUser.controller";
import { updateUser } from "../controller/user/putUser.controller";
import { logInUser } from "../controller/user/logIn.controller";

export const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.post("/", createUser);
userRouter.put("/", updateUser);
userRouter.post("/logIn", logInUser);
