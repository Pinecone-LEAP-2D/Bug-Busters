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
exports.createProfile = void 0;
const prismaClient_1 = __importDefault(require("../../prismaClient"));
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, about, avatarImage, socialMediaURL, backgroundImage, successMessage, userId } = req.body;
    try {
        const existingProfile = yield prismaClient_1.default.profile.findUnique({
            where: {
                userId: userId,
            },
        });
        if (existingProfile) {
            res.status(400).json({ error: "Profile already exists for this user." });
            return;
        }
        yield prismaClient_1.default.profile.create({
            data: {
                name: name,
                about: about,
                avatarImage: avatarImage,
                socialMediaURL: socialMediaURL,
                backgroundImage: backgroundImage,
                successMessage: successMessage,
                userId: userId
            }
        });
        res.status(201).json(`Profile created `);
    }
    catch (error) {
        console.log("Error occured ", error);
        res.send().status(400);
    }
});
exports.createProfile = createProfile;
