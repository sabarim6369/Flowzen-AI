const Agent = require("../models/Agent");

exports.addAgent = async (req, res) => {
  const { name, email, department } = req.body;

  const agent = await Agent.create({
    name,
    email,
    department,
    active: true
  });

  res.json(agent);
};

exports.getAgents = async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
};

exports.updateAgentStatus = async (req, res) => {
  const agent = await Agent.findByIdAndUpdate(
    req.params.id,
    { active: req.body.active },
    { new: true }
  );

  res.json(agent);
};