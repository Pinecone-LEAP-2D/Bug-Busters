import express from "express";
import { getProfile } from "../controller/profile/getProfile.controller";
import { createProfile } from "../controller/profile/createProfile.controller";
import { updateProfile } from "../controller/profile/updateProfile.controller";
import { deleteProfile } from "../controller/profile/deleteProfile.controller";
import getAllProfile from "../controller/profile/getAllProfile.controller";

export const profileRouter = express.Router();

profileRouter.get("/", getProfile);
profileRouter.post("/", createProfile);
profileRouter.put("/", updateProfile);
profileRouter.delete("/", deleteProfile);
profileRouter.get("/allProfile", getAllProfile);
