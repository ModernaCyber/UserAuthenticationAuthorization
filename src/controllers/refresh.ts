
import express from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import User from '../models/user';
import { ACCESS_TOKEN_SECRET } from '../constants/constants';
import dotenv from 'dotenv';
dotenv.config();

export const refreshToken = async (
   req: express.Request,
   res: express.Response
): Promise<void> => {
   try {
      const tokenSecret = process.env.TOKEN_SECRET || ACCESS_TOKEN_SECRET

      const refreshToken = req.headers.authorization?.split(' ')[1] || req.body.token;

      console.log(`Refreshing token: ${refreshToken}`);
      if (!refreshToken) {
         res.status(401).json({ message: 'Refresh token is required' });
         return;
      }

      const decodedData:any = await jwt.verify(refreshToken, 'ACCESS_TOKEN_SECRET') ;


      // Retrieve user from the database
      const { UserInfo } = decodedData

      const user = await User.findByPk(UserInfo.id);

      console.log(user);

      if (!user) {
         res.status(403).json({ message: 'User not authorized' });
         return
      }


      // create a new token for the user
      const newAccessToken = jwt.sign(
         { UserInfo: decodedData.UserInfo, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
         tokenSecret
      );

      // send the new access token to the user 
      res.status(200).json({
         token: newAccessToken,
      });

      return;
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
   }
};
