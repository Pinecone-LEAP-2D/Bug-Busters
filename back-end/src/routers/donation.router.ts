import express from "express";
import { DonationCreateMid } from "../middleware/DonationCreateMid";
import { CreateDonation } from "../controller/donation/createDonation.controller";
import { GetRecievedDonation } from "../controller/donation/getRecievedDonation.controller";
import { GetTotalEarningsDonation } from "../controller/donation/getTotalEarningsDonation.controller";
import { GetSearchDonation } from "../controller/donation/getSearchDonation.controller";

export const DonationRouter = express.Router();

DonationRouter.post("/", DonationCreateMid, CreateDonation);
DonationRouter.get("/", GetRecievedDonation);
DonationRouter.get("/total-earning/:userId", GetTotalEarningsDonation);
DonationRouter.get("/search/:userId", GetSearchDonation);
