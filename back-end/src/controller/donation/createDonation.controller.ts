import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const CreateDonation = async (req: Request, res: Response) => {
  const {
    amount,
    specialMessage,
    socialURLOrBuyMeCoffee,
    donorId,
    recipientId,
  } = req.body;
  try {
    const donation = await prisma.donation.create({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, message: "Internal Error" });
  }
};
