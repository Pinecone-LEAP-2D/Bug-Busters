import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const logInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else if (user.password !== password) {
      res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully logged in",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal Error",
    });
  }
};
