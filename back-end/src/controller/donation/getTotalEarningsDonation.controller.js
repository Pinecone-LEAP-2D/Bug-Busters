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
exports.GetTotalEarningsDonation = void 0;
const prismaClient_1 = __importDefault(require("../../prismaClient"));
const GetTotalEarningsDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    try {
        const result = yield prismaClient_1.default.donation.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                recipientId: userId,
            },
        });
        res.status(200).json({
            success: true,
            message: "Successfully retrieved total earnings",
            totalEarnings: result._sum.amount || 0,
        });
    }
    catch (error) {
        console.error("Error fetching total earnings:", error);
        res.status(500).json({ error: true, message: "Internal Error" });
    }
});
exports.GetTotalEarningsDonation = GetTotalEarningsDonation;
