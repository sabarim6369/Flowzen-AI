const express = require("express");
const router = express.Router();
const {
  addAgent,
  getAgents,
  updateAgentStatus
} = require("../controllers/agentController");

router.post("/agents", addAgent);
router.get("/agents", getAgents);
router.patch("/agents/:id/status", updateAgentStatus);

module.exports = router;