
import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ACCESS_TOKEN_SECRET } from '../constants/constants';
dotenv.config();

export const signInUser =async ( req: express.Request, res: express.Response): Promise<void> =>{
    
    const tokenSecret = process.env.TOKEN_SECRET || ACCESS_TOKEN_SECRET

    try {
        const { email,password } = req.body;

        const user:any = await User.findOne({ where: { email } });

        if(!user){
            res.status(403).json({ message: 'Could not Authenticate' });
        }

        const login = await bcrypt.compare(password, user.password)

        if(!login){
            res.status(403).json({ message: 'Could not Authenticate' });

        }
        
        const token = {
            UserInfo: {
                id: user.id,
                role: user.role,
            },
            exp: Math.floor(Date.now() / 1000) + 60 * 60, 
        };

        const accessToken = jwt.sign(
            token,
            tokenSecret,
        );
        const { password:savedPassword ,role:userRole, ...rest } = user.dataValues


        res.status(200).json({
            token:accessToken,
            user:{...rest}
        });
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}
