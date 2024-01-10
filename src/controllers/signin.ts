import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signInUser =async ( req: express.Request, res: express.Response): Promise<void> =>{
    
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
            'ACCESS_TOKEN_SECRET'
        );
        const { password:savedPassword ,role:userRole, ...rest } = user.dataValues


        res.status(200).json({
            token:accessToken,
            user:{...rest}
        });
        return
    } catch (error) {
        
    }

}
