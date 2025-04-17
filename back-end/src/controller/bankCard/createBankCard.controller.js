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
const prismaClient_1 = __importDefault(require("../../prismaClient"));
const createBankCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { country, firstName, lastName, cardNumber, expiryDate, cvc } = req.body;
    const userId = Number(req.params.userId);
    try {
        const newBankCard = yield prismaClient_1.default.bankCard.create({
            data: {
                country: country,
                firstName: firstName,
                lastName: lastName,
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                userId: userId,
                cvc: cvc,
            },
        });
        res.status(201).json({ msg: `Bank card created`, response: newBankCard });
        return;
    }
    catch (error) {
        console.log("Error occured at creating bank card", error);
        res.status(400).send(`Error creating bank card: ${error}`);
    }
});
exports.default = createBankCard;
