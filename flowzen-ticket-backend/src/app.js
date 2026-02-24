require("dotenv").config({ path: "../.env" });
const express = require("express");
const connectDB = require("./config/db");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();
app.use(express.json());
const agentRoutes = require("./routes/agentRoutes");

connectDB();
app.use("/api", ticketRoutes);
app.use("/api", agentRoutes);
app.listen(process.env.PORT, () =>
  console.log(`Ticket Backend running on ${process.env.PORT}`)
);