import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/user.model.js';
import { type User } from '../types/user.type.js';

const generateAccessToken = (user: any) => {
  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  return token;
};

const validateAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    return null;
  }
};

const createUser = async ({ name, email, password }: User) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    name: user.name,
    email: user.email,
    token: generateAccessToken(user),
  };
};

export { createUser, generateAccessToken, validateAccessToken };
