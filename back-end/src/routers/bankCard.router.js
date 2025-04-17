"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankCardRouter = void 0;
const express_1 = __importDefault(require("express"));
const createBankCard_controller_1 = __importDefault(require("../controller/bankCard/createBankCard.controller"));
const getBankCard_controller_1 = __importDefault(require("../controller/bankCard/getBankCard.controller"));
const updateBankCard_controller_1 = __importDefault(require("../controller/bankCard/updateBankCard.controller"));
exports.bankCardRouter = express_1.default.Router();
exports.bankCardRouter.post("/:userId", createBankCard_controller_1.default);
exports.bankCardRouter.get("/:userId", getBankCard_controller_1.default);
exports.bankCardRouter.put("/:userId", updateBankCard_controller_1.default);
