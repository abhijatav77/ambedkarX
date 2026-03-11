import mongoose from 'mongoose'

const bioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    identity: {
        type: String,
        required: true,
    },
    longBio: {
        type: String,
        required: true,
    },
    shortBio: {
        type: String,
        required: true,
        minlength: [350, "Minimum 350 characters required"]
    },
    bioImage: {
        public_id: {
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true
        }
    }
},{timestamps:true})

export const Bio = mongoose.model("Bio", bioSchema)