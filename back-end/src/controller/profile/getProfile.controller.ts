import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const getProfile = async (req: Request, res: Response) => {
  const userId = Number(req.query.userId)

  try {
    const result = await prisma.profile.findUnique({
      where: { userId },
    });
    res.status(200).json({
      success: true,
      message: `Profile found`,
      data: result,
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Internal Error" });
  }
};
