import express, { Request , Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';
import userRouter from './routes/user.route'
import { errorMiddleware } from './utils/errorHandler';
import { logger } from './utils/loggingHandler';

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response)=>{
    res.status(200).send('Welcome');
})
app.use('/auth', userRouter);

app.use(errorMiddleware);
app.use(logger)

app.listen(PORT, ()=>{
    console.log('listening on port ' + PORT);
});