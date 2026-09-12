const express = require("express");
const login = require("../../Controllers/authControllers/Login");
const router = express.Router();

router.get("/login", login);

module.exports = router;
