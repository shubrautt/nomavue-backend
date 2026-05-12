import { type Request, type Response } from 'express';
import mongoose from 'mongoose';

import TimelineModel from '../models/timeline.model.js';
import { uploadImagesToS3 } from '../services/timeline.service.js';

const createTimeline = async (req: Request, res: Response) => {
  try {
    const { lat, lng, userId, description, name } = req.body;
    const files = req.files as Express.Multer.File[];

    const { isValid, error } = validateTimelineInput(req.body, files);

    if (!isValid) {
      return res.status(400).json({ message: error });
    }

    const memories = await uploadImagesToS3(
      files,
      name.split(' ').join('-').toLowerCase(),
      userId
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

const validateTimelineInput = (body: any, files: any) => {
  if (!body.lat || !body.lng || !body.name || !body.userId) {
    return { isValid: false, error: 'Missing required fields' };
  }
  if (typeof body.lat !== 'number' || typeof body.lng !== 'number') {
    return { isValid: false, error: 'Coordinates must be numbers' };
  }
  if (body.lat < -90 || body.lat > 90 || body.lng < -180 || body.lng > 180) {
    return { isValid: false, error: 'Invalid coordinate range' };
  }
  if (!files || files.length === 0) {
    return { isValid: false, error: 'At least one image required' };
  }
  return { isValid: true };
};

export { createTimeline };
