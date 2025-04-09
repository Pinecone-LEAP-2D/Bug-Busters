import { Request, Response } from 'express';
import prisma from '../../prismaClient';

export const getUser = async (req: Request, res: Response) => {
    try {
        const result = await prisma.user.findMany()
        res.status(200).json(result)
    } catch (error) {
        console.log("Error occured ", error);
        res.send().status(400)
    }
}