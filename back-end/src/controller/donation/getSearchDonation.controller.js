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
exports.GetSearchDonation = void 0;
const prismaClient_1 = __importDefault(require("../../prismaClient"));
const GetSearchDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    const { amount, days } = req.query;
    const amountFilter = amount ? parseFloat(amount) : undefined;
    const daysFilter = days ? parseInt(days) : undefined;
    let dateFilter;
    if (daysFilter) {
        const now = new Date();
        const pastDate = new Date(now.getTime() - daysFilter * 24 * 60 * 60 * 1000);
        dateFilter = pastDate;
    }
    try {
        const donations = yield prismaClient_1.default.donation.findMany({
            include: {
                donor: {
                    select: {
                        id: true,
                        profile: {
                            select: {
                                name: true,
                                avatarImage: true,
                            },
                        },
                    },
                },
            },
            where: {
                recipientId: userId,
                amount: amountFilter ? { equals: amountFilter } : undefined,
                createdAt: dateFilter ? { gte: dateFilter } : undefined,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json({
            success: true,
            message: "Donations retrieved successfully",
            donations,
        });
    }
    catch (error) {
        console.error("Error fetching donations:", error);
        res.status(500).json({ error: true, message: "Internal Error" });
    }
});
exports.GetSearchDonation = GetSearchDonation;
