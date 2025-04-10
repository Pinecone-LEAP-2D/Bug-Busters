import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const createUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  try {
    await prisma.user.create({
      data: {
        email: email,
        password: password,
        username: username,
      },
    });
    res.status(200).json({
      success: true,
      message: `Successfully sign up`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error" });
  }
};
