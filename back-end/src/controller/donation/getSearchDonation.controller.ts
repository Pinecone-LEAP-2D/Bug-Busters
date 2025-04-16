import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const GetSearchDonation = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const { amount, days } = req.query;

  const amountFilter = amount ? parseFloat(amount as string) : undefined;
  const daysFilter = days ? parseInt(days as string) : undefined;

  let dateFilter: Date | undefined;

  if (daysFilter) {
    const now = new Date();
    const pastDate = new Date(now.getTime() - daysFilter * 24 * 60 * 60 * 1000);
    dateFilter = pastDate;
  }

  try {
    const donations = await prisma.donation.findMany({
      include: {
        donor: {
          select: {
            id: true,
            profile: {
              select: {
                name: true,
                avatarImage: true,
              },
            },
          },
        },
      },
      where: {
        recipientId: userId,
        amount: amountFilter ? { equals: amountFilter } : undefined,
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
