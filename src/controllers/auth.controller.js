const {registerUserService,loginUserService}=require("../services/auth.service");

 const registerUser = async (req, res) => {
    try{
        const {name,email,password,role}=req.body;
        const user = await registerUserService({name,email,password,role});
        return res.status(201).json({
            message: "User registered successfully",
            user,
            });
    }catch(err){
        throw err;
    }
 }

 const loginUser = async(req,res)=>{
    try{
        const{email,password}=req.body;
        const token = await loginUserService({email,password});
        return res.status(200).json({
            message:"User logged in successfully",
            token,
        });
    }catch(err){
        throw err;
    }
 }
 module.exports=({registerUser,loginUser});