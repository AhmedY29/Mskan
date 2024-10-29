import mongoose from "mongoose"

export const connectDB = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected...");
    } catch (error) {
       console.error("error : " + error.msg);
       process.exit(1);  
    }
}