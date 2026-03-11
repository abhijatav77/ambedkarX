import mongoose from "mongoose";
import 'dotenv/config'

export const main = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected successfully')
    } catch (error) {
        console.log(error)
    }
}