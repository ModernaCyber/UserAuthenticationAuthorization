import { NextFunction, Request ,Response} from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user';

dotenv.config();
export const authJWTByRole = (roles: string[]) => async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>=>{
    const TokenSecret = process.env.TOKEN_SECRET
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies.token;
      if (!token) {
        res.status(401).json({
          status: 401,
          success: false,
          message: "Access token is required",
          error: "",
        });
        return;
      }

      const decodedData: any = jwt.verify(token, TokenSecret);

      const { id , role } = decodedData

      const user:any = User.findByPk(id);

      if (!user) {
        res.status(401).json({
          status: 401,
          success: false,
          message: "User not found",
          error: "",
        });
        return;
      }

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
        
    }
}