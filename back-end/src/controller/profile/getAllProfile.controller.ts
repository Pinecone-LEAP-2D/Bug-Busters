import { Request, Response } from "express";
import prisma from "../../prismaClient";

const getAllProfile = async (req: Request, res: Response) => {
  try {
    const allProfile = await prisma.profile.findMany();
    res
      .status(200)
      .json({ msg: "get all profile success", allProfile: allProfile });
  } catch (error) {
    res.status(500).json({
      msg: "error in getting all user profiles",
      error: error,
    });
  }
};

export default getAllProfile;
