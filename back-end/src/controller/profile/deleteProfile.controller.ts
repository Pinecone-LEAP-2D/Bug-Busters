import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const deleteProfile = async (req: Request, res: Response) => {
    const {userId} = req.body;

    try {
        await prisma.profile.delete({
            where: {userId: userId}
        })
        res.status(201).json("Profile deleted");
    } catch (error) {
        console.log("Error occured ", error);
        res.send().status(400)
    }
}