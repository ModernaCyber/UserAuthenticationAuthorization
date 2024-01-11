/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints related to user operations
 */

import express from "express";
import { authJWTByRole } from '../middleware/authJWT';
import { ROLES } from "../config/roles";
import { UserPersonalController } from "../controllers/user";

const router = express.Router();


/**
 * @swagger
 * /user/personal/{id}:
 *   post:
 *     summary: Get user details (User and Admin Only)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer Token for authentication (e.g., "Bearer token")
 *     responses:
 *       '200':
 *         description: Operation successful
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *       '403':
 *         description: Forbidden - User does not have the required role
 */
router.post('/personal/:id', authJWTByRole([ROLES.User, ROLES.Admin]), UserPersonalController);

export default router;
