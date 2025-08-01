import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
async function connection(){
    let mongoAtring = process.env.MONGO_URI as string;
    try{
        let connect = await mongoose.connect(mongoAtring)
        console.log('connected to MongoDB')
    }
    catch(err){
        console.log('Error Connecting to MongoDB: ',err)
    }
}
export default connection