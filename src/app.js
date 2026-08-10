const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const doctorRoutes= require("./routes/doctor.routes");
const appointmentRoutes = require("./routes/appointment.routes");
const bookingRoutes = require("./routes/booking.routes");
const errorMiddleware = require("./middlewares/error.middleware");
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/bookings", bookingRoutes);

// Error middleware must be last
app.use(errorMiddleware);

module.exports = app;