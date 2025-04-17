"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationCreateMid = void 0;
const DonationCreateMid = (req, res, next) => {
    const { amount, specialMessage, socialURLOrBuyMeCoffee } = req.body;
    try {
        if (!amount) {
            res.status(404).json({
                error: true,
                message: `Not found amount`,
            });
        }
        else if (!specialMessage) {
            res.status(404).json({
                error: true,
                message: `Not found specialMessage`,
            });
        }
        else if (!socialURLOrBuyMeCoffee) {
            res.status(404).json({
                error: true,
                message: `Not found socail url or name`,
            });
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "Internal Error" });
    }
};
exports.DonationCreateMid = DonationCreateMid;
