import { type Request, type Response } from "express";

import { createUser } from "../services/user.service.js";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (
      [name, email, password].includes(undefined) ||
      [name, email, password].includes("")
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    console.log("comming here");

    await createUser({
      name,
      email,
      password
    })
  } catch {
    return res.status(400).json({ message: "Server Error" });
  }
};

const login = (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Hello from the user controller file!");
};

const logout = (req: Request, res: Response) => {
  res.send("User logged out successfully!");
};

export { register, login, logout };
