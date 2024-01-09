import { logEvents } from "./loggingHandler";
import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 4, 
  message: {
    message:
      "Too many login attempts from this IP, please try again after some time.",
    statusCode: 429, 
  },
  handler: (
    req: Request,
    res: Response,
    next: NextFunction,
    options: any // Adjust the type accordingly, if possible
  ) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${req.method}\turl: ${req.url}\thost: ${req.headers.host}\tlocation: ${req.headers.location}\torigin: ${req.headers.origin}\tip: ${req.ip}\t`,
      "errLog.log"
    );
    res.status(options.message.statusCode).send(options.message);
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
