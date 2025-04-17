"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationRouter = void 0;
const express_1 = __importDefault(require("express"));
const DonationCreateMid_1 = require("../middleware/DonationCreateMid");
const createDonation_controller_1 = require("../controller/donation/createDonation.controller");
const getRecievedDonation_controller_1 = require("../controller/donation/getRecievedDonation.controller");
const getTotalEarningsDonation_controller_1 = require("../controller/donation/getTotalEarningsDonation.controller");
const getSearchDonation_controller_1 = require("../controller/donation/getSearchDonation.controller");
exports.DonationRouter = express_1.default.Router();
exports.DonationRouter.post("/", DonationCreateMid_1.DonationCreateMid, createDonation_controller_1.CreateDonation);
exports.DonationRouter.get("/:userId", getRecievedDonation_controller_1.GetRecievedDonation);
exports.DonationRouter.get("/total-earning/:userId", getTotalEarningsDonation_controller_1.GetTotalEarningsDonation);
exports.DonationRouter.get("/search/:userId", getSearchDonation_controller_1.GetSearchDonation);
