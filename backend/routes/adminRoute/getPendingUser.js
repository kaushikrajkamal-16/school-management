const express = require("express");
const getPendingUser = require("../../Controllers/adminControllers/getPendingUser");
const router = express.Router();

router.get("/getPendingUser", getPendingUser);

module.exports = router;
