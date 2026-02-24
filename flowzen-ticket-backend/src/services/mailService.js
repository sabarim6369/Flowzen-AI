const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendAssignmentMail = async (to, ticketId) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "New Ticket Assigned",
    text: `You have been assigned ticket ${ticketId}`
  });
};

module.exports = { sendAssignmentMail };