import { Request, Response } from "express";
import prisma from "../../prismaClient";


export const updateProfile = async (req: Request, res: Response) => {
    const {name, about, avatarImage, socialMediaURL, backgroundImage, successMessage, userId} = req.body;

    try {
        const updatedProfile = await prisma.profile.update({
            where: {userId: userId},
            data: {
                name: name,
                about: about,
                avatarImage: avatarImage,
                socialMediaURL: socialMediaURL,
                backgroundImage: backgroundImage,
                successMessage: successMessage,
            }
        })
        res.status(201).json(`Profile updated ${updatedProfile}`);
    } catch (error) {
        console.log("Error occured ", error);
        res.send().status(400)
    }
}