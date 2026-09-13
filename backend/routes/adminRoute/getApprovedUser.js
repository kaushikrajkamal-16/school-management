const express = require("express");
const getApprovedUser = require("../../Controllers/adminControllers/getApprovedUser");
const router = express.Router();

router.get("/getUser", getApprovedUser);

module.exports = router;
