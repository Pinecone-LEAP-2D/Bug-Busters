import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const GetRecievedDonation = async (req: Request, res: Response) => {
  try {
    const result = await prisma.donation.findMany();
    res.status(200).json({
      success: true,
      message: `Successfully donation`,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error" });
  }
};
