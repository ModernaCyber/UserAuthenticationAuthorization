import express from "express";
import { refreshToken } from "../controllers/refresh";
import { signUpUser } from "../controllers/signup";
import { signInUser } from "../controllers/singin";

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', signInUser );
router.post('/reset', refreshToken);

export default router;