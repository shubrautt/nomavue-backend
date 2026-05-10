import express from 'express';
import multer from 'multer';

import { createTimeline } from '../controllers/timeline.controller.js';

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post('/create', upload.array('images'), createTimeline);

export default router;
