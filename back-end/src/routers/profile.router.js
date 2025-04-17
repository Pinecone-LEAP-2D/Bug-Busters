"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = __importDefault(require("express"));
const getProfile_controller_1 = require("../controller/profile/getProfile.controller");
const createProfile_controller_1 = require("../controller/profile/createProfile.controller");
const updateProfile_controller_1 = require("../controller/profile/updateProfile.controller");
const deleteProfile_controller_1 = require("../controller/profile/deleteProfile.controller");
const getAllProfile_controller_1 = __importDefault(require("../controller/profile/getAllProfile.controller"));
exports.profileRouter = express_1.default.Router();
exports.profileRouter.get("/", getProfile_controller_1.getProfile);
exports.profileRouter.get("/profiles", getAllProfile_controller_1.default);
exports.profileRouter.post("/", createProfile_controller_1.createProfile);
exports.profileRouter.put("/:userId", updateProfile_controller_1.updateProfile);
exports.profileRouter.delete("/", deleteProfile_controller_1.deleteProfile);
exports.profileRouter.get("/allProfile", getAllProfile_controller_1.default);
