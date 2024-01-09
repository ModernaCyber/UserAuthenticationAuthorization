import * as path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';
import { Request, Response, NextFunction } from 'express';

export const logEvents = async (message: string, logFileName: string): Promise<void> => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  const __filename = path.resolve();
  const __dirname = path.dirname(__filename);

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
  } catch (err) {
    console.error(err);
  }
};

export const logger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}\t${req.ip}`, 'reqLog.log');
  res.on('finish', () => {
    const duration = Date.now() - start;
    logEvents(`${req.method}\t${req.url}\t${res.statusCode}\t${duration}ms`, 'resLog.log');
  });
  next();
};
