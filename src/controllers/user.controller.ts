import { type Request, type Response } from 'express';

import { createUser } from '../services/user.service.js';
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

const login = (req: Request, res: Response) => {
  console.log(req.body);
  res.send('Hello from the user controller file!');
};

const logout = (req: Request, res: Response) => {
  res.send('User logged out successfully!');
};

export { register, login, logout };
