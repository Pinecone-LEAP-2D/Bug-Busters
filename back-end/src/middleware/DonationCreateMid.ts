import { NextFunction, Request, Response } from "express";

export const DonationCreateMid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { amount, specialMessage, socialURLOrBuyMeCoffee } = req.body;
  try {
    if (!amount) {
      res.status(404).json({
        error: true,
        message: `Not found amount`,
      });
    } else if (!specialMessage) {
      res.status(404).json({
        error: true,
        message: `Not found specialMessage`,
      });
    } else if (!socialURLOrBuyMeCoffee) {
      res.status(404).json({
        error: true,
        message: `Not found socail url or name`,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error" });
  }
};
