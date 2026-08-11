const express = require("express");
const router=express.Router();
const verifyToken = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const {registerDoctor,getAllDoctors,getDoctorById,updateDoctor,deleteDoctor}=require("../controllers/doctor.controller");
const validate = require("../middlewares/validation.middleware");
const { registerDoctorSchema } = require("../validators/doctor.validator");

router.post("/registerDoctor", verifyToken, authorizeRoles("admin"), validate(registerDoctorSchema),registerDoctor);
router.get("/getAllDoctors",verifyToken,authorizeRoles("admin"),getAllDoctors);
router.get("/getDoctorById/:id",verifyToken,authorizeRoles("admin"),getDoctorById);
router.put("/updateDoctor/:id",verifyToken,authorizeRoles("admin"),updateDoctor);
router.delete("/deleteDoctor/:id",verifyToken,authorizeRoles("admin"),deleteDoctor);
module.exports = router;