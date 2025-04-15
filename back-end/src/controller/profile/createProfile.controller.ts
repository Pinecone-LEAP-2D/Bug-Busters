import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const createProfile = async (req: Request, res: Response) => {
    const { name, about, avatarImage, socialMediaURL, backgroundImage, successMessage, userId } = req.body;

    try {
        const existingProfile = await prisma.profile.findUnique({
            where: {
                userId: userId,
            },
        });

        if (existingProfile) {
            res.status(400).json({ error: "Profile already exists for this user." });
            return;
        }

        await prisma.profile.create({
            data: {
                name: name,
                about: about,
                avatarImage: avatarImage,
                socialMediaURL: socialMediaURL,
                backgroundImage: backgroundImage,
                successMessage: successMessage,
                userId: userId
            }
        })
        res.status(201).json(`Profile created `);
    } catch (error) {
        console.log("Error occured ", error);
        res.send().status(400)
    }
}