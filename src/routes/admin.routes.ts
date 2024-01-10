/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Endpoints for admin testing
 */

import express from "express";
import { authJWTByRole } from '../middleware/authJWT';
import { ROLES } from "../config/roles";

const router = express.Router();

/**
 * @swagger
 * /admin/test/post:
 *   post:
 *     summary: Test POST operation (Admin Only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Message to be echoed
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *             example:
 *               message: "Hello, Admin!"
 *     responses:
 *       '200':
 *         description: Operation successful
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *       '403':
 *         description: Forbidden - User does not have the required role
 * 
 *   get:
 *     summary: Test GET operation (Admin Only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Operation successful
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *       '403':
 *         description: Forbidden - User does not have the required role
 */
router.post('/test/post', authJWTByRole([ROLES.Admin]), (req: express.Request, res: express.Response) => {
    // Process the POST request
    const message = req.body.message || "No message provided";
    res.status(200).json({ result: `POST operation successful. Message: ${message}` });
});

router.get('/test/get', authJWTByRole([ROLES.Admin]),  (req: express.Request, res: express.Response) => {
    // Process the GET request
    res.status(200).json({ result: "GET operation successful" });
});

export default router;
