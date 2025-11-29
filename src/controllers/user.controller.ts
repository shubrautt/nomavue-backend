import type e = require("express");

const { createUser } = require("../services/user.service");

const register = async (req: e.Request, res: e.Response) => {
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

const login = (req: e.Request, res: e.Response) => {
  console.log(req.body);
  res.send("Hello from the user controller file!");
};

const logout = (req: e.Request, res: e.Response) => {
  res.send("User logged out successfully!");
};

module.exports = { register, login, logout };
