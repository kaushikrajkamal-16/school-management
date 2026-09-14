const express = require("express");
const router = express.Router();
const subject = require("./subject");

router.use("/subjectRoute", subject);

module.exports = router;
