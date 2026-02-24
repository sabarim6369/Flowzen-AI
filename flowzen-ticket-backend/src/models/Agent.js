const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  active: Boolean
});

module.exports = mongoose.model("Agent", agentSchema);