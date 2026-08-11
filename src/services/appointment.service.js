const { application } = require("express");
const {createAppointment,
    getAllAppointments,
    getAppointmentById
    ,updateAppointment,
    deleteAppointment,
    getAppointmentsByDoctorId,
getAppointmentForCancellation,
    cancelAppointment} = require("../models/appointment.model");

const createAppointmentService = async (doctorId, date, startTime, endTime) =>{
    try{
        const result = await createAppointment(doctorId, date, startTime, endTime);
        if(!result){
            throw new Error("Appointment can not be created");
        }
        return result;
    }catch (error) {
        throw error;
    }
}

const getAllAppointmentsService = async () => {
    try {
        const result = await getAllAppointments();
        return result;// if the function returns empty array we will check it in controller as !result is never valid even for empty array.
    } catch (error) {
        throw error;
    }
}

const getAppointmentByIdService = async (id) => {
    try {
        const result = await getAppointmentById(id);

        if (!result) {
            throw new Error("Appointment not found");
        }

        return result;
    } catch (error) {
        throw error;
    }
};

const updateAppointmentService = async (id,date,start_time,end_time)=>{
    try{
        const result = await updateAppointment(id,date,start_time,end_time);
        return result;
    }catch (error) {
        throw error;
    }
}

const deleteAppointmentService = async (id)=>{
    try{
        const result = await deleteAppointment(id);
        return result;
    }catch (error) {
        throw error;
    }
}

const getAppointmentsByDoctorIdService = async(doctorId)=>{
    try{
        const result = await getAppointmentsByDoctorId(doctorId);
        return result;
    }catch (error) {
        throw error;
    }
}

const cancelAppointmentService = async (appointmentId, userId) => {
    let client;

    try {
        // Get a dedicated database connection from the pool
        client = await pool.connect();

        // Start a database transaction
        await client.query("BEGIN");

        // Lock the appointment row
        const lockRow = await getAppointmentForCancellation(
            client,
            appointmentId
        );

        if (!lockRow) {
            throw new Error("Appointment not found");
        }

        // Find the doctor associated with the logged-in user
        const doctor = await getDoctorByUserIdService(userId);

        if (!doctor) {
            throw new Error("Doctor not found");
        }

        // Check whether this appointment belongs to this doctor
        if (lockRow.doctor_id != doctor.id) {
            throw new Error("Not Authorized");
        }

        // Appointment is already cancelled
        if (lockRow.status == "cancelled") {
            throw new Error("Appointment cannot be cancelled");
        }

        // Find booking associated with this appointment
        const booking = await getBookingByAppointmentId(
            client,
            appointmentId
        );

        // Cancel booking if it exists
        if (booking) {
            await cancelBooking(client, booking.id);
        }

        // Cancel the appointment
        const cancelledAppointment = await cancelAppointment(
            client,
            appointmentId
        );

        await client.query("COMMIT");

        return cancelledAppointment;

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
};


module.exports = {
    createAppointmentService,
    getAllAppointmentsService,
    getAppointmentByIdService,
    updateAppointmentService,
    deleteAppointmentService,
    getAppointmentsByDoctorIdService
};