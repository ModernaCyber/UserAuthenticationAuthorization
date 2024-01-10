import { NextFunction, Request ,Response} from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { ACCESS_TOKEN_SECRET } from '../constants/constants';

dotenv.config();
export const authJWTByRole = (roles: string[]) => async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>=>{

    const tokenSecret = process.env.TOKEN_SECRET || ACCESS_TOKEN_SECRET
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
      if (!token) {
        res.status(401).json({
          status: 401,
          success: false,
          message: "Access token is required",
          error: "",
        });
        return;
      }

      const decodedData:any = await jwt.verify(token, tokenSecret) ;


      const { UserInfo } = decodedData

      const { id , role } = UserInfo

      const user:any = await User.findByPk(id);

      if (!user) {
        res.status(401).json({
          status: 401,
          success: false,
          message: "User not found",
          error: "",
        });
        return;
      }

      // check if the user is authorised to the role
      if (!roles.includes(user.role)) {
        res.status(403).json({
          status: 403,
          success: false,
          message: "Insufficient permissions",
          error: "",
        });
        return;
      }
      
      next();

    try {
        
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}