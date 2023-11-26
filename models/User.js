import {models,model,Schema} from "mongoose"


const userSchema = new Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default:()=> Date.now(),
        immutable : true, // can not immutate this field
    }
})

const User = models.User || model("User",userSchema)

export default User;
