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
exports.updateProfile = void 0;
const prismaClient_1 = __importDefault(require("../../prismaClient"));
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, about, avatarImage, socialMediaURL, backgroundImage } = req.body;
    const userId = Number(req.params.userId);
    try {
        const updatedProfile = yield prismaClient_1.default.profile.update({
            where: { userId: userId },
            data: {
                name: name,
                about: about,
                avatarImage: avatarImage,
                socialMediaURL: socialMediaURL,
                backgroundImage: backgroundImage,
            },
        });
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedProfile,
        });
    }
    catch (error) {
        console.log("Error occured ", error);
        res.send().status(400);
    }
});
exports.updateProfile = updateProfile;
