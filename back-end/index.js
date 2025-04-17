"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./src/routers/user.router");
const profile_router_1 = require("./src/routers/profile.router");
const cors_1 = __importDefault(require("cors"));
const donation_router_1 = require("./src/routers/donation.router");
const bankCard_router_1 = require("./src/routers/bankCard.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = 8001;
app.use("/user", user_router_1.userRouter);
app.use("/profile", profile_router_1.profileRouter);
app.use("/donation", donation_router_1.DonationRouter);
app.use("/bankCard", bankCard_router_1.bankCardRouter);
app.listen(port, () => {
    console.log("Server started at http://localhost:" + port);
});
