"use strict";
const express = require("express");
const { handleMessage } = require("../controllers/message");

const router = express.Router();

router.post("/message", handleMessage);

module.exports = router;
