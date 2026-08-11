
const{createDoctorService,
    getAllDoctorsService, 
    getDoctorByIdService, 
    updateDoctorService,
    deleteDoctorService}=require("../services/doctor.service");

const registerDoctor= async(req,res,next)=>{
    try{
        const { name, email, password, specialization } = req.body;
        const doctor = await createDoctorService({ name, email, password, specialization });
        return res.status(201).json({
            message: "Doctor registered successfully",
            doctor,
            });
    }catch (error) {
    next(error);
}
}

const getAllDoctors=async(req,res,next)=>{
    try{
        const allDoctors= await getAllDoctorsService();
        return res.status(200).json({
            message:"Found all doctors successfully",
            allDoctors
        })
    }catch (error) {
    next(error);
}
}

const getDoctorById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const doctorById = await getDoctorByIdService(id);

       if (!doctorById) {
    throw new AppError("Doctor not found", 404);
}

        return res.status(200).json({
            message: "Found doctor successfully",
            doctorById
        });
    } catch (error) {
    next(error);
}
}

const updateDoctor = async (req, res,next) => {
    try {
        const { specialization } = req.body;
        const id = req.params.id;
        const updatedDoctor = await updateDoctorService(specialization, id);
       
        return res.status(200).json({
            message: "Doctor Updated successfully",
            updatedDoctor
        });

    } catch (error) {
    next(error);
}
}

const deleteDoctor = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const deletedDoctor = await deleteDoctorService(id);
        
        return res.status(200).json({
            message:"Doctor deleted successfully",
            deletedDoctor
        });
    }catch (error) {
    next(error);
}
}


module.exports={registerDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor};