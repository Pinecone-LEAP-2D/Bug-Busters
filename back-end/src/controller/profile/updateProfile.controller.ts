import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const updateProfile = async (req: Request, res: Response) => {
  const { name, about, avatarImage, socialMediaURL, backgroundImage } =
    req.body;
  const userId = Number(req.params.userId);

  try {
    const updatedProfile = await prisma.profile.update({
      where: { userId: userId },
      data: {
        name: name,
        about: about,
        avatarImage: avatarImage,
        socialMediaURL: socialMediaURL,
        backgroundImage: backgroundImage,
      },
    });
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedProfile,
    });
  } catch (error) {
    console.log("Error occured ", error);
    res.send().status(400);
  }
};
