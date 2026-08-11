
const{createDoctorService,
    getAllDoctorsService, 
    getDoctorByIdService, 
    updateDoctorService,
    deleteDoctorService}=require("../services/doctor.service");

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

const updateDoctor = async (req, res) => {
    try {
        const { specialization } = req.body;
        const id = req.params.id;
        const updatedDoctor = await updateDoctorService(specialization, id);
        if (!updatedDoctor) {
            return res.status(404).json({
                message: "Doctor Not Found"
            }
            );
        }
        return res.status(200).json({
            message: "Doctor Updated successfully",
            updatedDoctor
        });

    } catch (error) {
        throw error;
    }
}

const deleteDoctor = async (req,res)=>{
    try{
        const id = req.params.id;
        const deletedDoctor = await deleteDoctorService(id);
        if(!deletedDoctor){
            return res.status(404).json({
                message:"Doctor Not Found"
            });
        }
        return res.status(200).json({
            message:"Doctor deleted successfully",
            deletedDoctor
        });
    }catch (error) {
        throw error;
    }
}


module.exports={registerDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor};