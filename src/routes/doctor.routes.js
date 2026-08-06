const express = require("express");
const router=express.Router();
const verifyToken = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const {registerDoctor,getAllDoctors,getDoctorById}=require("../controllers/doctor.controller");
router.post("/registerDoctor",verifyToken,authorizeRoles("admin"),registerDoctor);
router.get("/getAllDoctors",verifyToken,authorizeRoles("admin"),getAllDoctors);
router.get("/getDoctorById/:id",verifyToken,authorizeRoles("admin"),getDoctorById);
module.exports = router;