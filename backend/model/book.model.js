import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true
    },
    image: {
        public_id:{
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    }
})

export const Book = mongoose.model("Book", bookSchema)