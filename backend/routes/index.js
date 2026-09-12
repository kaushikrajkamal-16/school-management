const express = require("express");
const router = express.Router();
const BASE_URL = process.env.BASE_URL;
const authRoute = require("../routes/authRoute/index");

router.use(BASE_URL, authRoute);

module.exports = router;
