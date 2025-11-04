import type e = require("express");

const helloController = (req: e.Request, res: e.Response) => {
  res.send("Hello from the hello controller file!");
};

module.exports = helloController;