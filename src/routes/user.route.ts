import type e = require("express");

const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/user.controller.ts");

router.get("/register", register);
router.get("/login", login);

module.exports = router;
