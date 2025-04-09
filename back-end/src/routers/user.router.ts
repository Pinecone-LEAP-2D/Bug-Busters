import express from 'express'
import { getUser } from '../controller/user/getUser.controller';

export const userRouter = express.Router();

userRouter.get("/", getUser);