import express from "express";
import { authJWTByRole } from '../middleware/authJWT';
import { ROLES } from "../config/roles";

const router = express.Router();

router.post('/*', authJWTByRole([ROLES.Admin]), (req: express.Request, res: express.Response) => {
    // Echo back the request body
    res.status(200).json(req.body)});
router.get('/*', authJWTByRole([ROLES.Admin]),  (req: express.Request, res: express.Response) => {
    // Echo back the request body
    res.status(200).json(req.body)});

export default router;