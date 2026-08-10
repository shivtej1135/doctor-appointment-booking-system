const express = require("express");
const router=express.Router();
const verifyToken = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const {createAppointmentController,
    getAllAppointmentsController,
    getAppointmentByIdController,updateAppointmentController,
    deleteAppointmentController,getAppointmentsByDoctorIdController} = require("../controllers/appointment.controller");

router.post("/createAppointment",verifyToken,authorizeRoles("doctor"),createAppointmentController);
router.get("/allAppointments",verifyToken,authorizeRoles("admin"),getAllAppointmentsController);
router.get("/appointmentById/:id",verifyToken,authorizeRoles("admin"),getAppointmentByIdController);
router.put("/updateAppointments/:id",verifyToken,authorizeRoles("doctor"),updateAppointmentController);
router.delete("/deleteAppointment/:id",verifyToken,authorizeRoles("doctor"),deleteAppointmentController);
router.get("/getAppointmentsByDoctorId",verifyToken,authorizeRoles("doctor"),getAppointmentsByDoctorIdController);
module.exports = router;