"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const getUser_controller_1 = require("../controller/user/getUser.controller");
const createUser_controller_1 = require("../controller/user/createUser.controller");
const putUser_controller_1 = require("../controller/user/putUser.controller");
const logIn_controller_1 = require("../controller/user/logIn.controller");
const ValidateSignUp_1 = require("../middleware/ValidateSignUp");
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/", getUser_controller_1.getUser);
exports.userRouter.post("/sign-up", ValidateSignUp_1.validateEmailAndPassword, createUser_controller_1.createUser);
exports.userRouter.put("/:id", putUser_controller_1.updateUser);
exports.userRouter.post("/logIn", logIn_controller_1.logInUser);
