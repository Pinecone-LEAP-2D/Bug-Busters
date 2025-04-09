import { Request, Response } from 'express';
import prisma from '../../prismaClient';

export const getProfile = async (req: Request, res: Response) => {
    try {
        const result = await prisma.profile.findMany()
        res.status(200).json(`${result}`)
    } catch (error) {
        console.log("Error occured ", error);
        res.send().status(400)
    }
}