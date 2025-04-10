import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const GetSearchDonation = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const { amount, days } = req.query;

  const amountFilter = amount ? parseFloat(amount as string) : undefined;
  const daysFilter = days ? parseInt(days as string) : undefined;

  const currentDate = new Date();
  let dateFilter: Date | undefined;

  if (daysFilter === 30) {
    dateFilter = new Date(currentDate.setDate(currentDate.getDate() - 30));
  } else if (daysFilter === 60) {
    dateFilter = new Date(currentDate.setDate(currentDate.getDate() - 60));
  } else if (daysFilter === 90) {
    dateFilter = new Date(currentDate.setDate(currentDate.getDate() - 90));
  }

  try {
    const donations = await prisma.donation.findMany({
      where: {
        recipientId: userId,
        amount: amountFilter ? { gte: amountFilter } : undefined,
        createdAt: dateFilter ? { gte: dateFilter } : undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Donations retrieved successfully",
      donations,
    });
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: true, message: "Internal Error" });
  }
};
