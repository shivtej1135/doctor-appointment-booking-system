const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const doctorRoutes= require("./routes/doctor.routes");
const appointmentRoutes = require("./routes/appointment.routes");
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

module.exports = app;