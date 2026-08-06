const pool = require("../config/db");
const createDoctor = async ({ userId, specialization }) => {
    try{
        const result = await pool.query(
        `INSERT INTO doctors (user_id,specialization)
        Values($1,$2)
        RETURNING *`,
        [userId,specialization]
        );
        return result.rows[0];
    }catch(error){
        throw error;
    }
};

const getAllDoctors = async () => {
    try {
        const result = await pool.query(
            `SELECT
                doctors.id,
                users.name,
                users.email,
                doctors.specialization
             FROM users
             INNER JOIN doctors
             ON users.id = doctors.user_id`
        );

        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getDoctorById = async (id) => {
    try {
        const result = await pool.query(
            `SELECT
                doctors.id,
                users.name,
                users.email,
                doctors.specialization
            FROM users
            INNER JOIN doctors
            ON users.id = doctors.user_id
            WHERE doctors.id = $1`,
            [id]
        );

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};


module.exports={createDoctor,getAllDoctors,getDoctorById};