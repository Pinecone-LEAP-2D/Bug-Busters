import { Request, Response } from "express";
import prisma from "../../prismaClient";

const createBankCard = async (req: Request, res: Response) => {
  const { country, firstName, lastName, cardNumber, expiryDate, cvc } =
    req.body;

  const userId = Number(req.params.userId);

  try {
    const newBankCard = await prisma.bankCard.create({
      data: {
        country: country,
        firstName: firstName,
        lastName: lastName,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        userId: userId,
        cvc: cvc,
      },
    });

    res.status(201).json({ msg: `Bank card created`, response: newBankCard });
    return;
  } catch (error) {
    console.log("Error occured at creating bank card", error);
    res.status(400).send(`Error creating bank card: ${error}`);
  }
};

export default createBankCard;
