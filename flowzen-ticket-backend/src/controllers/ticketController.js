const Ticket = require("../models/Ticket");
const Agent = require("../models/Agent");
const { sendAssignmentMail } = require("../services/mailService");

exports.createTicket = async (req, res) => {
  const { description, category, priority, department } = req.body;

  const agent = await Agent.findOne({ department, active: true });

  if (!agent) return res.status(404).json({ message: "No agent available" });

  const ticket = await Ticket.create({
    description,
    category,
    priority,
    department,
    assignedTo: agent._id
  });

  await sendAssignmentMail(agent.email, ticket._id);

  res.json({ ticketId: ticket._id });
};