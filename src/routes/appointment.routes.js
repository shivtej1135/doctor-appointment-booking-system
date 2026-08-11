const express = require("express");
const router=express.Router();
const verifyToken = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const {createAppointmentController,
    getAllAppointmentsController,
    getAppointmentByIdController,updateAppointmentController,
    deleteAppointmentController,
    cancelAppointmentController,
    getAppointmentsByDoctorIdController} = require("../controllers/appointment.controller");
    const validate = require("../middlewares/validation.middleware");
const {
    createAppointmentSchema,
    updateAppointmentSchema
} = require("../validators/appointment.validator");

router.post("/createAppointment",verifyToken,authorizeRoles("doctor"),validate(createAppointmentSchema),createAppointmentController);
router.get("/allAppointments",verifyToken,authorizeRoles("admin"),getAllAppointmentsController);
router.get("/appointmentById/:id",verifyToken,authorizeRoles("admin"),getAppointmentByIdController);
router.put("/updateAppointments/:id",verifyToken,authorizeRoles("doctor"),validate(updateAppointmentSchema),updateAppointmentController);
router.delete("/deleteAppointment/:id",verifyToken,authorizeRoles("doctor"),deleteAppointmentController);
router.get("/getAppointmentsByDoctorId",verifyToken,authorizeRoles("doctor"),getAppointmentsByDoctorIdController);
router.patch("/cancelAppointment/:id",verifyToken,authorizeRoles("doctor"),cancelAppointmentController)
module.exports = router;