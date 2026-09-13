const express = require("express");
const approveUser = require("../../Controllers/adminControllers/approveUser");
const router = express.Router();

router.patch("/approveUser", approveUser);

module.exports = router;
