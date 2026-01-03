import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';

import {
  createUser,
  generateAccessToken,
  validateAccessToken,
} from '../services/user.service.js';
import UserModel from '../models/user.model.js';

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (
      [name, email, password].includes(undefined) ||
      [name, email, password].includes('')
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const isUserExists = await UserModel.findOne({ email });
    if (isUserExists)
      return res.status(400).json({ message: 'User already exists' });

    const user = await createUser({
      name,
      email,
      password,
    });

    res.cookie('token', user.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch {
    return res.status(400).json({ message: 'Server Error' });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (
      [email, password].includes(undefined) ||
      [email, password].includes('')
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = generateAccessToken(user);

      console.log(token);

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        name: user.name,
        email: user.email,
      });
    });
  } catch {
    return res.status(400).json({ message: 'Server Error' });
  }
};

const logout = (req: Request, res: Response) => {
  res.send('User logged out successfully!');
};

const verify = (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = validateAccessToken(token);
    if (!user) {
      res.clearCookie('token');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return res.status(200).json(user);
  } catch {
    return res.status(400).json({ message: 'Server Error' });
  }
};

export { register, login, logout, verify };
