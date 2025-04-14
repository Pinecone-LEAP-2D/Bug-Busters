import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const id = Number(req.params.id);

    if (!id || !password) {
      res.status(400).json({
        success: false,
        message: "Missing id or password",
      });
    } else {
      const result = await prisma.user.update({
        where: {
          id: id,
        },
        data: { password: password },
      });
      res.status(200).json({
        success: true,
        message: "Successfully updated password",
        data: result,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Error" });
  }
};
