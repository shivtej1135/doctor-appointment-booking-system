const{createDoctorService,getAllDoctorsService, getDoctorByIdService}=require("../services/doctor.service");

const registerDoctor= async(req,res)=>{
    try{
        const { name, email, password, specialization } = req.body;
        const doctor = await createDoctorService({ name, email, password, specialization });
        return res.status(201).json({
            message: "Doctor registered successfully",
            doctor,
            });
    }catch(error){
        throw error;
    }
}

const getAllDoctors=async(req,res)=>{
    try{
        const allDoctors= await getAllDoctorsService();
        return res.status(200).json({
            message:"Found all doctors successfully",
            allDoctors
        })
    }catch(error){
        throw error;
    }
}

const getDoctorById = async (req, res) => {
    try {
        const id = req.params.id;
        const doctorById = await getDoctorByIdService(id);

        if (!doctorById) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        return res.status(200).json({
            message: "Found doctor successfully",
            doctorById
        });
    } catch (error) {
        throw error;
    }
}
module.exports={registerDoctor,getAllDoctors,getDoctorById};