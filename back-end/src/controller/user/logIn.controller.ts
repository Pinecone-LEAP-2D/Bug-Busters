import { Request, Response } from "express";
import prisma from "../../prismaClient";
import jwt from "jsonwebtoken";

export const logInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    const decodePassword = "123";

    const token = jwt.sign(
      { userId: user?.id, email: user?.email, username: user?.username },
      decodePassword,
      { expiresIn: "2 days" }
    );

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
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: token,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal Error",
    });
  }
};
