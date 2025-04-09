import { Request, Response } from 'express';
import prisma from '../../prismaClient';

export const createUser = async (req: Request, res: Response) => {
    const {email, password, username} = req.body
    try {
        await prisma.user.create({
            data: {
                email: email,
                password: password,
                username: username
            }
        })
    } catch (error) {
        
    }
}