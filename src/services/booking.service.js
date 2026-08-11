const pool = require("../config/db");
const AppError = require("../utils/errors");
const {
    createBooking,
    getAppointmentForBooking,
    updateAppointmentStatus,
    getBookingsByUserId,
    getBookingForCancellation,
    cancelBooking,
    updateAppointmentStatusAfterCancellation
} = require("../models/booking.model");


const createBookingService = async (appointmentId, userId) => {
    let client;

    try {
        // Get a dedicated database connection from the pool
        client = await pool.connect();

        // Start a database transaction
        await client.query("BEGIN");

        const appointment = await getAppointmentForBooking(
        client,
        appointmentId
    );
        if (!appointment) {
            throw new AppError("Appointment not found", 404);
}

        if (appointment.status !== "available") {
            throw new AppError("Appointment is already booked", 409);
}

        // Create the booking using the same database connection
        const result = await createBooking(client,appointmentId,userId);

        const update = await updateAppointmentStatus(client, appointmentId);
        
        // Permanently save all changes made in this transaction
        await client.query("COMMIT");

        return result;

    } catch (error) {

        // If anything fails, undo all changes made in this transaction
        if (client) {
            await client.query("ROLLBACK");
        }

        // Pass the error to the controller/error middleware
        throw error;

    } finally {

        // Return the database connection back to the connection pool
        if (client) {
            client.release();
        }
    }
}

const getBookingsByUserIdService = async(userId)=>{
    try{
        const result= await getBookingsByUserId(userId);
        return result;
    }catch (error) {
        throw error;
    }
}

const cancelBookingService = async (bookingId, userId) => {
    let client;
    try{
        // Get a dedicated database connection from the pool
        client = await pool.connect();

        // Start a database transaction
        await client.query("BEGIN");

        const cancel = await getBookingForCancellation(client,bookingId);

        if (!cancel) {
            throw new AppError("Booking not found", 404);
        }

        if(cancel.user_id!=userId){
            throw new AppError("Not Authorized", 403);
        }

        if(cancel.status!="confirmed"){
            throw new AppError("Booking cannot be cancelled", 409);
        }

        const cancelledBooking = await cancelBooking(client, bookingId);
       

        const updateAppointment = await updateAppointmentStatusAfterCancellation(client, cancel.appointment_id);

        await client.query("COMMIT");

        return cancelledBooking;


    } catch (error) {

        // If anything fails, undo all changes made in this transaction
        if (client) {
            await client.query("ROLLBACK");
        }

        // Pass the error to the controller/error middleware
        throw error;

    } finally {

        // Return the database connection back to the connection pool
        if (client) {
            client.release();
        }
    }
}

module.exports={createBookingService,
    getBookingsByUserIdService,
    cancelBookingService};