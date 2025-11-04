import type e = require("express");

const login = (req: e.Request, res: e.Response) => {
  res.send("Hello from the user controller file!");
};

const logout = (req: e.Request, res: e.Response) => {
  res.send("User logged out successfully!");
};

module.exports = { login, logout };
