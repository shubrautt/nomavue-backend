import { type Request, type Response } from 'express';
import mongoose from 'mongoose';

import TimelineModel from '../models/timeline.model.js';
import { uploadImagesToS3 } from '../services/timeline.service.js';

const createTimeline = async (req: Request, res: Response) => {
  try {
    const { lat, lng, userId, description, name } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!lat || !lng || !name || !userId) {
      return res.status(400).json({ message: 'lat/lng/name/userId required' });
    }

    const memories = await uploadImagesToS3(
      files,
      name.split(' ').join('-').toLowerCase()
    );

    const timeline = await TimelineModel.create({
      lat,
      lng,
      memoriesUrls: memories,
      user: new mongoose.Types.ObjectId(userId),
      description: description || '',
      name: name,
    });

    return res.status(200).json(timeline);
  } catch (error) {
    console.log('[ERROR] failed to create timeline: ', error);
    return res.status(500).json({ message: 'Failed to create timeline' });
  }
};

export { createTimeline };
