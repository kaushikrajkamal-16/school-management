const express = require("express");
const deleteUser = require("../../Controllers/adminControllers/deleteUser");
const router = express.Router();

router.delete("/deleteUser", deleteUser);

module.exports = router;
