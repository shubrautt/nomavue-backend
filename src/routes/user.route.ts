import express from 'express';

const router = express.Router();

import { register, login, verify } from '../controllers/user.controller.js';

router.post('/register', register);
router.get('/login', login);
router.get('/verify', verify);

export default router;
