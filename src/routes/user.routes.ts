import express from "express";
import { authJWTByRole } from '../middleware/authJWT';
import { ROLES } from "../config/roles";
import { UserPersonalController } from "../controllers/user";

const router = express.Router();

router.post('/personal/:id',authJWTByRole([ROLES.User,ROLES.Admin]), UserPersonalController );

export default router;