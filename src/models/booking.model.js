const { Client } = require("pg");
const pool = require("../config/db");


const createBooking = async (client,appointmentId, userId)=>{
    try{
        const result = await client.query(
            `INSERT INTO bookings (appointment_id,user_id)
            VALUES($1,$2)
            RETURNING *`,
            [appointmentId, userId]
        );
        return result.rows[0];
    }catch (error) {
        throw error;
    }
}

const getAppointmentForBooking = async (client, appointmentId) => {
    try {
        const result = await client.query(
            `SELECT *
             FROM appointments
             WHERE id = $1
             FOR UPDATE`,
            [appointmentId]
        );

        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

const updateAppointmentStatus = async (client, appointmentId) => {
        try{
            const result = await client.query(
                `UPDATE appointments
                SET status=$1
                WHERE id=$2
                RETURNING *`,
                ["booked",appointmentId]
                
            );
            return result.rows[0];
        }catch (error) {
        throw error;
    }
};

const getBookingsByUserId = async (userId) => {
    try {
        const result = await pool.query(
            `SELECT
                bookings.id AS booking_id,
                users.name AS doctor_name,
                appointments.date,
                appointments.start_time,
                appointments.end_time,
                bookings.status
            FROM bookings
            INNER JOIN appointments
                ON bookings.appointment_id = appointments.id
            INNER JOIN doctors
                ON appointments.doctor_id = doctors.id
            INNER JOIN users
                ON doctors.user_id = users.id
            WHERE bookings.user_id = $1`,
            [userId]
        );

        return result.rows;

    } catch (error) {
        throw error;
    }
};

const getBookingForCancellation = async (client, bookingId) => {
    try {
        const result = await client.query(
            `SELECT *
             FROM bookings
             WHERE id = $1
             FOR UPDATE`,
            [bookingId]
        );

        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

const cancelBooking= async(client,bookingId)=>{
    try{
        const result = await client.query(
            `UPDATE bookings
            SET status = $1
            WHERE id=$2
            RETURNING *`,
            ["cancelled",bookingId]
        );
        return result.rows[0];
    }catch (error) {
        throw error;
    }
}

const updateAppointmentStatusAfterCancellation = async (client, appointmentId) => {
        try{
            const result = await client.query(
                `UPDATE appointments
                SET status=$1
                WHERE id=$2
                RETURNING *`,
                ["available",appointmentId]
                
            );
            return result.rows[0];
        }catch (error) {
        throw error;
    }
};

const getBookingByAppointmentId = async (client, appointmentId) => {
    try {
        const result = await client.query(
            `SELECT *
             FROM bookings
             WHERE appointment_id = $1
             FOR UPDATE`,
            [appointmentId]
        );

        return result.rows[0];

    } catch (error) {
        throw error;
    }
};


module.exports = {
    createBooking,
    getAppointmentForBooking,
    updateAppointmentStatus,
    getBookingsByUserId,
    getBookingForCancellation,
    cancelBooking,
    updateAppointmentStatusAfterCancellation
};