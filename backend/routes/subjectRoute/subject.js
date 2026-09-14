const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const requireAdmin = require("../../middleware/requireAdmin");
const subjectCreate = require("../../Controllers/subjectControllers/subjectCreate");
const getSubject = require("../../Controllers/subjectControllers/getSubject");
const updateSubject = require("../../Controllers/subjectControllers/updateSubject");
const deleteSubject = require("../../Controllers/subjectControllers/deleteSubject");
const subjectById = require("../../Controllers/subjectControllers/subjectById");

const router = express.Router();

router.use(authMiddleware, requireAdmin);

router.post("/create", subjectCreate);
router.get("/get", getSubject);
router.put("/update/:id", updateSubject);
router.delete("/delete/:id", deleteSubject);
router.get("/subject-by-id/:id", subjectById);

module.exports = router;
