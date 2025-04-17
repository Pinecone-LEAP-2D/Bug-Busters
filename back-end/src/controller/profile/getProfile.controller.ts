import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const getProfile = async (req: Request, res: Response) => {
  const userId = Number(req.query.userId);
  try {
    const result = await prisma.profile.findMany({
      where: {
        userId: userId,
      },
    });

    if (result.length === 0) {
      res.status(404).json({ msg: "No profiles found for this user" });
      return;
    }

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
