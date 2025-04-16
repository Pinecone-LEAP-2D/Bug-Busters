import { Request, Response } from "express";
import prisma from "../../prismaClient";

const getBankCard = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const bankCard = await prisma.bankCard.findMany({
      where: {
        userId: userId,
      },
    });

    if (bankCard.length === 0) {
      res.status(404).json({ msg: "No bank cards found for this user" });
      return;
    }
    res
      .status(201)
      .json({ msg: `Bank card get successfuly`, response: bankCard });
    return;
  } catch (error) {
    console.log("Error occured at getting bank card", error);
    res.status(400).send(`Error getting bank card: ${error}`);
  }
};

export default getBankCard;
