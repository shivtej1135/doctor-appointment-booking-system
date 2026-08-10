const {createBookingService,getBookingsByUserIdService,cancelBookingService} = require("../services/booking.service");

const createBookingController = async(req,res,next)=>{
    try{
        const userId = req.user.id;
        const appointmentId = req.params.id;
        const createBooking = await createBookingService(appointmentId,userId);
         return res.status(201).json({
            message: "Booking created successfully",
            createBooking
        });
    }catch (error) {
    next(error);
}
}

const getBookingsByUserIdController = async(req,res,next)=>{
    try{
        const id=req.user.id;
        const getBookingsByUserId = await getBookingsByUserIdService(id);
        return res.status(200).json({
            message:"Bookings fetched successfully",
            getBookingsByUserId
        });
    }catch (error) {
    next(error);
}
}

const cancelBookingController = async(req,res,next)=>{
    try{
        const bookingId = req.params.id;
        const userId = req.user.id;
        const cancelBooking = await cancelBookingService(bookingId, userId);
        return res.status(200).json({
            message:"Booking cancelled Successfully",
            cancelBooking
        });
    }catch (error) {
    next(error);
}
}

module.exports={createBookingController,getBookingsByUserIdController,cancelBookingController};