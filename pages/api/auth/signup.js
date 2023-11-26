import User from "@/models/User";
import { encryptPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res){
    if(req.method!=="POST") return;
    try{
        await connectDB()
    }catch(err){
        return res.status(500).json({status:"faild",message:"Error in connecting to DB..."})
    }
    const { email, password } = req.body.data
    if(!email || !password){
        return res.status(422).json({status:"faild", message:"Invalid Data"})
    }
    const existingUser = await User.findOne({email})
    if(existingUser) return res.status(422).json({status:"faild",message:"User already exsits..."})
    const encPass = await encryptPassword(password)
    
    const user = await User.create({email:email,password:encPass})
    res.status(201).json({status:"success",message:"User successfully created..",data:user})
 
    
}