

import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ACCESS_TOKEN_SECRET } from '../constants/constants';
dotenv.config();

export const signUpUser = async (req: express.Request, res: express.Response): Promise<void> => {
  
  const tokenSecret = process.env.TOKEN_SECRET || ACCESS_TOKEN_SECRET


  try {
    const { username, firstname, lastname, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {

      res.status(400).json({ error: 'Email is already registered' });
      return;
    }

    const newUser = await User.create({
      username,
      firstname,
      lastname,
      email,
      password,
      role,
    });
    // const newUser = new User({
    //     username,
    //     firstname,
    //     lastname,
    //     email,
    //     password,
    //     role,
    //   });
      
    //   // Set other properties if needed
    //   // newUser.someProperty = someValue;
      
    //   await newUser.save();
    const token = {
        UserInfo: {
            id: newUser.id,
            role: newUser.role,
        },
        exp: Math.floor(Date.now() / 1000) + 60 * 60, 
    };

    const accessToken = jwt.sign(
        token,
        tokenSecret
    );
    const { password:savedPassword ,role:userRole, ...rest } = newUser.dataValues

     res.status(201).json({
            token:accessToken,
            user:{...rest}
        });
    return
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
