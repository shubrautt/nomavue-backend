import express from "express";

const router = express.Router();

import { register, login } from "../controllers/user.controller.js"

router.get("/register", register);
router.get("/login", login);

export default router;
