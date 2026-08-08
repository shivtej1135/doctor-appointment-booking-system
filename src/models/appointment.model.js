const pool = require("../config/db");

const createAppointment = async (doctorId, date, startTime, endTime) => { //appointment is created by doctor not admin.
        try{
            const result = await pool.query(
                `INSERT INTO appointments (doctor_id,date,start_time,end_time)
                VALUES($1,$2,$3,$4)
                 RETURNING *`,
                 [doctorId, date, startTime, endTime]
            );
            return result.rows[0];
        }catch(error){
        throw error;
    }
}

const getAllAppointments = async () => {
    try {
        const result = await pool.query(
            `SELECT
                appointments.id AS appointment_id,
                users.name AS doctor_name,
                doctors.specialization AS specialization,
                appointments.date AS appointment_date,
                appointments.start_time AS start_time,
                appointments.end_time AS end_time,
                appointments.status AS appointment_status
            FROM appointments
            INNER JOIN doctors
                ON appointments.doctor_id = doctors.id
            INNER JOIN users
                ON doctors.user_id = users.id`
        );

        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getAppointmentById = async(id)=>{
    try{
        const result= await pool.query(
            `SELECT 
                appointments.id AS appointment_id,
                appointments.doctor_id AS doctor_id,
                users.name AS doctor_name,
                doctors.specialization AS specialization,
                appointments.date AS appointment_date,
                appointments.start_time AS start_time,
                appointments.end_time AS end_time,
                appointments.status AS appointment_status
            FROM appointments
            INNER JOIN doctors
                ON appointments.doctor_id = doctors.id
            INNER JOIN users
                ON doctors.user_id = users.id
                WHERE appointments.id = $1`,
                [id]
        );
        return result.rows[0];
    }catch (error) {
        throw error;
    }
}

const updateAppointment = async(id,date,start_time,end_time)=>{
    try{
        const result = await pool.query(
            `UPDATE appointments
            SET date = $1,
                start_time=$2,
                end_time=$3
                 WHERE id = $4
                RETURNING *`,
                [date,start_time,end_time,id]
        );
        return result.rows[0];
    }catch (error) {
        throw error;
    }
}

const deleteAppointment = async (id) => {
    try {
        const result = await pool.query(
            `DELETE FROM appointments
            WHERE id = $1
            RETURNING *`,
            [id]
        );
        return result.rows[0];
    }catch (error) {
        throw error;
    }
}

module.exports={createAppointment,getAllAppointments,getAppointmentById,updateAppointment,deleteAppointment};