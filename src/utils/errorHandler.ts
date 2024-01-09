import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error occurred:', err);

  res.status(500).json({
    status: 'error',
    message: 'An internal server error occurred',
    error: err.message,
  });
};
