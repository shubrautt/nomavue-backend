import type e = require("express");

const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller.ts");

router.get("/login", userController);

module.exports = router;
