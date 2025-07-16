import mongoose from "mongoose";
const URI = process.env.MONGODB_URI
const connectDb = async ()=>{
    try {
        await mongoose.connect(URI);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.log("Connection to databasse FAILED :",error.message);
        process.exit(0);
    }
}
export default  connectDb;