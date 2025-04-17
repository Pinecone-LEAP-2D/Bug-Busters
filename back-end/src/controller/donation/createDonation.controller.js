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
exports.CreateDonation = void 0;
const prismaClient_1 = __importDefault(require("../../prismaClient"));
const CreateDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, specialMessage, socialURLOrBuyMeCoffee, donorId, recipientId, } = req.body;
    try {
        const donation = yield prismaClient_1.default.donation.create({
            data: {
                amount: amount,
                specialMessage: specialMessage,
                socialURLOrBuyMeCoffee: socialURLOrBuyMeCoffee,
                donorId: donorId,
                recipientId: recipientId,
            },
        });
        res.status(200).json({
            success: true,
            message: `Successfully donation`,
            data: donation,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "Internal Error" });
    }
});
exports.CreateDonation = CreateDonation;
