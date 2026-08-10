const express = require("express");
const router=express.Router();
const verifyToken = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const{createBookingController,getBookingsByUserIdController,cancelBookingController} = require("../controllers/booking.controller");
router.post("/createBooking/:id",verifyToken,authorizeRoles("patient"),createBookingController);
router.get("/getBookingByUserId",verifyToken,authorizeRoles("patient"),getBookingsByUserIdController);
router.patch("/cancelBooking/:id",verifyToken,authorizeRoles("patient"),cancelBookingController);
module.exports = router;