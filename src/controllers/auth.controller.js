const {registerUserService,loginUserService}=require("../services/auth.service");

 const registerUser = async (req, res,next) => {
    try{
        const {name,email,password,role}=req.body;
        const user = await registerUserService({name,email,password,role});
        return res.status(201).json({
            message: "User registered successfully",
            user,
            });
    }catch(err){
    next(err);
}
 }

 const loginUser = async(req,res,next)=>{
    try{
        const{email,password}=req.body;
        const token = await loginUserService({email,password});
        return res.status(200).json({
            message:"User logged in successfully",
            token,
        });
    }catch(err){
    next(err);
}
 }
 module.exports=({registerUser,loginUser});