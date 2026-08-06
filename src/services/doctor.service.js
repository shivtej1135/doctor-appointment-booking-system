const {createDoctor,getAllDoctors,getDoctorById}=require("../models/doctor.model");
const {findUserByEmail,createUser}=require("../models/user.model");
const bcrypt = require("bcrypt");

const createDoctorService = async ({ name, email, password, specialization }) => {
    try {
        const result = await findUserByEmail(email);
        if(result){
            throw new Error("User already exists");
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
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports={createDoctorService,getAllDoctorsService,getDoctorByIdService};