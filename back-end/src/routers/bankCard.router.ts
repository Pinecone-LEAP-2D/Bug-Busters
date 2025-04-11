import express from "express";
import createBankCard from "../controller/bankCard/createBankCard.controller";
import getBankCard from "../controller/bankCard/getBankCard.controller";
import updateBankCard from "../controller/bankCard/updateBankCard.controller";

export const bankCardRouter = express.Router();

bankCardRouter.post("/:userId", createBankCard);
bankCardRouter.get("/:userId", getBankCard);
bankCardRouter.put("/:userId", updateBankCard);
