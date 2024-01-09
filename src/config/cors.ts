import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const setOrigin = process.env.NODE_ENV === 'production' ? process.env.OriginUrl : 'http://localhost:3001'

const corsOptions:CorsOptions = {
    allowedHeaders: ['content-type','Authorization','json'],
    origin:  setOrigin ,
    credentials: true,
    
}

export const corsMiddleware = cors(corsOptions)