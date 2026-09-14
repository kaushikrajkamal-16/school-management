const express = require("express");
const router = express.Router();
const BASE_URL = process.env.BASE_URL;
const authRoute = require("../routes/authRoute/index");
const adminRoute = require("../routes/adminRoute/index");
const subjectRoute = require("./subjectRoute");

router.use(BASE_URL, authRoute);
router.use(BASE_URL, adminRoute);
router.use(BASE_URL, subjectRoute);

module.exports = router;
