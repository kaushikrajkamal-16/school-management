const express = require("express");
const router = express.Router();
const getApprovedUser = require("./getApprovedUser");
const pendingUser = require("./getPendingUser");
const approvedUser = require("./approveUser");
const deleteUser = require("./deleteUser");

router.use("/adminRoute", getApprovedUser);
router.use("/adminRoute", pendingUser);
router.use("/adminRoute", approvedUser);
router.use("/adminRoute", deleteUser);

module.exports = router;
