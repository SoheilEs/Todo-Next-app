import User from "@/models/User"
import { verifyPassword } from "@/utils/auth"
import connectDB from "@/utils/connectDB"
import NextAuth from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "@/lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter"

const authOptions = {
    session:{strategy:"jwt"},
    providers: [
        CredentialsProvider({
        async authorize(credentails,req){
           const {email, password} = credentails
           try{
                await connectDB()
           }catch(err){
                throw new Error("Error in connecting to DB!")
                
           }
           if(!email || !password) throw new Error("Invaild Data")
           const user = await User.findOne({email})
           if(!user) throw new Error("User dosen't exists!")
           const isValid = await verifyPassword(password,user.password)
           if(!isValid) throw new Error("Userame or Password is invalid!")
           return{email}

        },
    }),
    GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      })
],
adapter:MongoDBAdapter(clientPromise)
}

export default NextAuth(authOptions)

