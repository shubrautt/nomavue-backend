import type e = require("express");

const express = require("express");

const router = express.Router();

const helloController = require("../controllers/hello.controller.ts");

router.get("/", helloController);

module.exports = router;
