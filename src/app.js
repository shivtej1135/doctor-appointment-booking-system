const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const doctorRoutes= require("./routes/doctor.routes")
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);

module.exports = app;