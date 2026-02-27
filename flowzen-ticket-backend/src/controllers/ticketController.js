const Ticket = require("../models/Ticket");
const Agent = require("../models/Agent");
const { getSolution } = require("../services/aiService");

exports.createTicket = async (req, res) => {
  const { description, category, priority, department } = req.body;

  // If priority is NOT High, provide AI solution without assigning agent
  if (priority !== "High") {
    const solution = await getSolution(description, category);
    
    // Still create ticket record but without agent assignment
    const ticket = await Ticket.create({
      description,
      category,
      priority,
      department,
      assignedTo: null
    });

    return res.json({
      ticketId: ticket._id,
      priority: priority,
      assignedToAgent: false,
      solution: solution,
      message: "This ticket has been resolved with an automated solution. No agent assignment needed."
    });
  }

  // For High priority, assign to an agent
  const agent = await Agent.findOne({ department, active: true });

  if (!agent) return res.status(404).json({ message: "No agent available" });

  const ticket = await Ticket.create({
    description,
    category,
    priority,
    department,
    assignedTo: agent._id
  });

  res.json({ 
    ticketId: ticket._id, 
    priority: priority,
    assignedToAgent: true,
    assignedTo: {
      id: agent._id,
      name: agent.name,
      email: agent.email,
      department: agent.department
    },
    ticket: {
      description,
      category,
      priority,
      department
    }
  });
};