import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const getAllProfile = async (req: Request, res: Response) => {
  try {
    const result = await prisma.profile.findMany();
    res.status(200).json({
      success: true,
      message: `All profiles`,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Internal Error" });
  }
};
