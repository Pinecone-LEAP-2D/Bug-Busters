import express from "express";
import createBankCard from "../controller/bankCard/createBankCard.controller";

export const bankCardRouter = express.Router();

bankCardRouter.post("/", createBankCard);
