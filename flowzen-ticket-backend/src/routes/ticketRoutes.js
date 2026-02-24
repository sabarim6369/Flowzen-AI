const express = require("express");
const router = express.Router();
const { createTicket } = require("../controllers/ticketController");

router.post("/tickets", createTicket);

module.exports = router;