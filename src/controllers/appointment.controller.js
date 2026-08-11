const {createAppointmentService,
    getAllAppointmentsService,
    getAppointmentByIdService,
    updateAppointmentService,
    deleteAppointmentService,cancelAppointmentService,
getAppointmentsByDoctorIdService}=require("../services/appointment.service");
const AppError = require("../utils/errors");

const {getDoctorByUserIdService}=require("../services/doctor.service");

const createAppointmentController = async (req, res,next) => {
    try {
        // Logged in user's id
        const id = req.user.id;

        // Appointment details
        const { date, startTime, endTime } = req.body;

        // Find doctor using user id
        const doctor = await getDoctorByUserIdService(id);

        

        // Create appointment
        const appointment = await createAppointmentService(
            doctor.id,
            date,
            startTime,
            endTime
        );

        // Success response
        return res.status(201).json({
            message: "Appointment created successfully",
            appointment
        });

    } catch (error) {
    next(error);
}
};

const getAllAppointmentsController = async (req, res,next) => {
    try {
        const allAppointments = await getAllAppointmentsService();

        return res.status(200).json({
            message: "Found all appointments successfully",
            allAppointments
        });
    } catch (error) {
        throw error;
    }
};

const getAppointmentByIdController = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const appointmentById = await getAppointmentByIdService(id);
        return res.status(200).json({
            message:"Found the appointment successfully",
            appointmentById
        });

    }catch (error) {
    next(error);
}
}

const updateAppointmentController = async(req,res,next)=>{
    try{
        const userId=req.user.id;
        const {date,start_time,end_time}= req.body;
        const appointmentId = req.params.id;

        const doctor = await getDoctorByUserIdService(userId);
        const appointment = await getAppointmentByIdService(appointmentId);

        

         if (appointment.doctor_id !== doctor.id) {
            throw new AppError("Unauthorized", 403);
        }
        
        const updateDoctor = await updateAppointmentService(appointmentId,date,start_time,end_time);
        return res.status(200).json({
            message:"Appointment updated successfully",
            updateDoctor
        });

    }catch (error) {
    next(error);
}
}

const deleteAppointmentController = async(req,res,next)=>{
    try{
        const userId=req.user.id;
        const appointmentId = req.params.id;

         const doctor = await getDoctorByUserIdService(userId);
        const appointment = await getAppointmentByIdService(appointmentId);

       

         if (appointment.doctor_id !== doctor.id) {
            throw new AppError("Unauthorized", 403);
        }

        const deleteAppointment = await deleteAppointmentService(appointmentId);
         return res.status(200).json({
            message:"Appointment deleted successfully",
            deleteAppointment
        });
    }catch (error) {
    next(error);
}
}

const getAppointmentsByDoctorIdController = async (req, res,next) => {
    try {
        const id = req.user.id;
        const  doctor = await getDoctorByUserIdService(id);
        const doctorId = doctor.id;

        const getAppointment = await getAppointmentsByDoctorIdService(doctorId);
        return res.status(200).json({
            message: "Appointments fetched successfully",
            getAppointment
        });
    } catch (error) {
    next(error);
}
}

const cancelAppointmentController = async (req, res, next) => {
    try {
        const appointmentId = req.params.id;
        const userId = req.user.id;

        const cancelAppointment = await cancelAppointmentService(
            appointmentId,
            userId
        );

        return res.status(200).json({
            message: "Appointment cancelled successfully",
            cancelAppointment
        });

    } catch (error) {
        next(error);
    }
};

module.exports={createAppointmentController,
    getAllAppointmentsController,
    getAppointmentByIdController,
    updateAppointmentController,
    deleteAppointmentController,cancelAppointmentController,
    getAppointmentsByDoctorIdController};