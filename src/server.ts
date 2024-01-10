import express, { Request , Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';
import userRouter from './routes/user.routes'
import adminRouter from './routes/admin.routes'
import authRouter from './routes/auth.routes'
import { errorMiddleware } from './utils/errorHandler';
import { logger } from './utils/loggingHandler';
import { dbConnection } from './db/DbConnect';
import sequelize from './db/DbConfig';

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

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/*', adminRouter);


app.use(errorMiddleware);
app.use(logger)


const isDev = process.env.SYNC_DB ? process.env.SYNC_DB === "true" : false;


(
    async () => {

    await sequelize.sync({ alter: isDev })

    await dbConnection();
    app.listen(PORT, ()=>{
        console.log('listening on port ' + PORT);
    });
}
)()

export { app }