import mongoose from "mongoose";

export default async function connectDB() {
    const uri = process.env.DB_URI
    if(mongoose.connections[0].readyState) return console.log("already conncted");
    await mongoose.connect(uri)
    console.log("Connecting to DB...")
}
