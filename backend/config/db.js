import mongoose from "mongoose";


const connectDB = async ()=>{
    try{
        const dbURI = process.env.MONGO_URI;

        const conn = await mongoose.connect(dbURI)

        console.log(`Database connected to ${conn.connection.host}`);

    }catch(error){
        console.error(`Error in database connection: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;