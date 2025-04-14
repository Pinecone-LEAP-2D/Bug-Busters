import { Request, Response } from "express";
import prisma from "../../prismaClient";

const updateBankCard = async (req: Request, res: Response) => {
  try {
    const { country, firstName, lastName, cardNumber, expiryDate, cvc } =
      req.body;
    const userId = Number(req.params.userId);

    const updatedBankCard = await prisma.bankCard.updateMany({
      where: {
        userId: userId,
      },
      data: {
        country: country,
        firstName: firstName,
        lastName: lastName,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvc: cvc,
      },
    });
    res.status(201).json({
      msg: `Bank card updated successfuly`,
      response: updatedBankCard,
    });
    return;
  } catch (error) {
    console.log("Error occured at updating bank card", error);
    res.status(400).send(`Error updating bank card: ${error}`);
  }
};

export default updateBankCard;
