const express = require("express");
const router=express.Router();
const verifyToken = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const{createBookingController,getBookingsByUserIdController,cancelBookingController} = require("../controllers/booking.controller");
const validate = require("../middlewares/validation.middleware");
const { bookingIdSchema } = require("../validators/booking.validator");

router.post("/createBooking/:id",verifyToken,authorizeRoles("patient"),validate(bookingIdSchema, "params"),createBookingController);
router.get("/getBookingByUserId",verifyToken,authorizeRoles("patient"),getBookingsByUserIdController);
router.patch("/cancelBooking/:id",verifyToken,authorizeRoles("patient"), validate(bookingIdSchema, "params"),cancelBookingController);
module.exports = router;