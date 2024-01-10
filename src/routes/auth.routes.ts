
import express from "express";
import { refreshToken } from "../controllers/refresh";
import { signUpUser } from "../controllers/signup";
import { signInUser } from "../controllers/signin";


const router = express.Router();


/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User information for registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       '201':
 *         description: User registration successful
 *         content:
 *           application/json:
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user: { id: 1, username: "newuser", email: "user@example.com", role: "user" }
 *       '400':
 *         description: Email is already registered
 *         content:
 *           application/json:
 *             example:
 *               error: "Email is already registered"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.post('/signup', signUpUser);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User credentials for authentication
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5CI6IkpXVCJ9..."
 *               user: { id: 1, email: "user@example.com", role: "user" }
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid credentials"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.post('/login', signInUser );

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh user token
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Token refresh successful
 *         content:
 *           application/json:
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5CI6IkpXVCJ9..."
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */ 
router.post('/refresh', refreshToken);

export default router;