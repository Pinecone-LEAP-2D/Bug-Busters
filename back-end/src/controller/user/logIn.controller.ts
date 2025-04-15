import { Request, Response } from "express";
import prisma from "../../prismaClient";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
      return;
    }

    const decodePassword = "123";

    const token = jwt.sign(
      { userId: user?.id, email: user?.email, username: user?.username },
      decodePassword,
      { expiresIn: "2 days" }
    );

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
