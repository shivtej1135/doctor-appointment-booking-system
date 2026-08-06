const { findUserByEmail, findUserById, createUser } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const registerUserService = async ({ name, email, password, role }) => {
    try{
            const existingUser = await findUserByEmail(email);
           if (existingUser) {
            throw new Error("User already exists");
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
            throw new Error("User does not exist");

            const isMatch= await bcrypt.compare(
                password,
                existingUser.password
            )
        
        if(!isMatch) throw new Error("Invalid email or password");
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