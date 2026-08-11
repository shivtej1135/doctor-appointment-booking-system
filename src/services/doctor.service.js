const AppError = require("../utils/errors");
const {createDoctor,
    getAllDoctors,
    updateDoctor,
    deleteDoctor,
    getDoctorByUserId,
getDoctorById}=require("../models/doctor.model");

const {findUserByEmail,createUser}=require("../models/user.model");

const bcrypt = require("bcrypt");

const createDoctorService = async ({ name, email, password, specialization }) => {
    try {
        const result = await findUserByEmail(email);
        if(result){
            throw new AppError("User already exists", 409);
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user= await createUser({name,email,password:hashedPassword,role:"doctor"});
        const userD= await createDoctor({userId:user.id,specialization});
        return{
            user,
            doctor: userD
        };

    } catch (error) {
        throw error;
    }
};

const getAllDoctorsService = async () => {
    try {
        const result = await getAllDoctors();
        return result;
    } catch (error) {
        throw error;
    }
};

const getDoctorByIdService = async (id) => {
    try {
        const result = await getDoctorById(id);
        if (!result) {
    throw new AppError("Doctor not found", 404);
}
        return result;
    } catch (error) {
        throw error;
    }
}

const updateDoctorService = async (specialization,id)=>{
    try{
        const result = await updateDoctor(specialization,id);
        if (!result) {
    throw new AppError("Doctor not found", 404);
}

        return result;
    }catch (error) {
        throw error;
    }
}

const deleteDoctorService = async (id)=>{
    try{
        const result = await deleteDoctor(id);
        if (!result) {
    throw new AppError("Doctor not found", 404);
}

        return result;
    }catch (error) {
        throw error;
    }
}


const getDoctorByUserIdService = async (id)=>{
    try{
        const result = await getDoctorByUserId(id);
        if (!result) {
    throw new AppError("Doctor not found", 404);
}

        return result;
    }catch (error) {
        throw error;
    }
}


module.exports={createDoctorService,
    getAllDoctorsService,
    getDoctorByIdService,
    updateDoctorService,
    deleteDoctorService,getDoctorByUserIdService};