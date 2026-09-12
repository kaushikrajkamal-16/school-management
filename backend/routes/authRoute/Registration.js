const express = require("express");
const registration = require("../../Controllers/authControllers/Registration");
const router = express.Router();

router.post("/registration", registration);

module.exports = router;
