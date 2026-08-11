const { findUserByEmail, findUserById, createUser } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const AppError = require("../utils/errors");

const registerUserService = async ({ name, email, password, role }) => {
    try{
            const existingUser = await findUserByEmail(email);
           if (existingUser) {
            throw new AppError("User already exists", 409);
}
          const hashedPassword=await bcrypt.hash(password,10);
            const user=await createUser({name,email,password:hashedPassword,role});
            return user;
    }catch (err) {
    throw err;
}
}

const loginUserService= async({email,password})=>{
    try{
        const existingUser= await findUserByEmail(email);
        if(!existingUser)
            throw new AppError("User does not exist", 404);

            const isMatch= await bcrypt.compare(
                password,
                existingUser.password
            )
        
        if(!isMatch) throw new AppError("Invalid email or password", 401);
        const token = jwt.sign(
            {
            id:existingUser.id,
            role:existingUser.role
            },
            process.env.JWT_SECRET,
                {
                   expiresIn: process.env.JWT_EXPIRES_IN
                }
            );
            return token;
    }catch(err){
        throw err;
    }
}
module.exports = {registerUserService,loginUserService};