import User from "@/models/User"
import { verifyPassword } from "@/utils/auth"
import { getSession } from "next-auth/react"
import connectDB from "@/utils/connectDB"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

async function handler(req, res){
    if(req.method !=="POST") return
    try{
        await connectDB()
    }catch(err){
        return res.status(500).json({status:"faild",message:"Error in connecting to DB..."})
    }
    const {firstname, lastname, password} = req.body.userInfo
    
    const session = await getSession({req})
    console.log(session);


    if(!session) {
        return res.status(401).json({status:"faild",message:"You are not logged in!"})
    }
    const user = await User.findOne({email:session.user.email})
    if(!user) return res.status(404).json({status:"faild", message:"User doesn't exists!"})
    const isValid = await verifyPassword(password,user.password)

    if(!isValid){
        return res.status(422).json({
            status:"faild",
            message:"password is incorrect!"
        })
    }
    user.firstname = firstname
    user.lastname = lastname
    user.save()
    res.status(200).json({status:"success",data:{firstname,lastname,email:session.user.email}})
}
export default handler