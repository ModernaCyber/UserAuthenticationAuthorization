import express, { Request, Response } from 'express';
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
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config()
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'User Authentication and Authorization Express App',
            version: '1.0.0',
            description:
                'This project is an Express.js server built with TypeScript, Sequelize, and PostgreSQL for user authentication and authorization. It uses JSON Web Tokens (JWT) for token-based authentication and supports two user roles: "user" and "admin."',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'John Mangi',
                url: 'https://chefshive.com',
                email: 'modernacyber@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./dist/routes/*.js'],
};
const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
    );

/**
 * @swagger
 * tags:
 *   name: General
 *   description: General endpoints
 *
 * /:
 *   get:
 *     summary: Get welcome message
 *     tags: [General]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           text/plain:
 *             example: Welcome
 */
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome');
})

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);


app.use(errorMiddleware);
app.use(logger)


const isDev = process.env.SYNC_DB ? process.env.SYNC_DB === "true" : false;


(
    async () => {

        await sequelize.sync({ alter: isDev })

        await dbConnection();
        app.listen(PORT, () => {
            console.log('listening on port ' + PORT);
        });
    }
)()

export { app }