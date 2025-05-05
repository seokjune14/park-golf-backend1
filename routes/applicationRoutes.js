const express = require("express");
const router = express.Router();
const {
  createApplication,
  updateApplicationStatus,
  getApplications,
} = require("../controllers/applicationController");

router.post("/", createApplication);
router.get("/", getApplications);
router.put("/:appId", updateApplicationStatus);

module.exports = router;
