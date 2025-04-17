"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInUser = void 0;
const prismaClient_1 = __importDefault(require("../../prismaClient"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prismaClient_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
            return;
        }
        const decodePassword = "123";
        const token = jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email, username: user === null || user === void 0 ? void 0 : user.username }, decodePassword, { expiresIn: "2 days" });
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token: token,
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Internal Error",
        });
    }
});
exports.logInUser = logInUser;
