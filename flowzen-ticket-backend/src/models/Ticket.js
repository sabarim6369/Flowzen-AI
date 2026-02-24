const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  description: String,
  category: String,
  priority: String,
  department: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent"
  },
  status: { type: String, default: "OPEN" }
});

module.exports = mongoose.model("Ticket", ticketSchema);