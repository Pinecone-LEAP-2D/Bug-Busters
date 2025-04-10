import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const GetTotalEarningsDonation = async (req: Request, res: Response) => {
  // const {}=req.params
  try {
    const result = await prisma.donation.aggregate({
      _sum: {
        amount: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Successfully retrieved total earnings",
      totalEarnings: result._sum.amount || 0,
    });
  } catch (error) {
    console.error("Error fetching total earnings:", error);
    res.status(500).json({ error: true, message: "Internal Error" });
  }
};
