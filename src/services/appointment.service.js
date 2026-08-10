const {createAppointment,
    getAllAppointments,
    getAppointmentById
    ,updateAppointment,
    deleteAppointment,getAppointmentsByDoctorId} = require("../models/appointment.model");

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


module.exports = {
    createAppointmentService,
    getAllAppointmentsService,
    getAppointmentByIdService,
    updateAppointmentService,
    deleteAppointmentService,
    getAppointmentsByDoctorIdService
};