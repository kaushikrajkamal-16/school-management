const express = require("express");
const router = express.Router();
const BASE_URL = process.env.BASE_URL;
const authRoute = require("../routes/authRoute/index");
const adminRoute = require("../routes/adminRoute/index");

router.use(BASE_URL, authRoute);
router.use(BASE_URL, adminRoute);

module.exports = router;
