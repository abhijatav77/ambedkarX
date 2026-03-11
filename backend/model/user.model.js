import mongoose from "mongoose";
import validator from 'validator'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter valid email"]
    },
    password: {
        type: String,
        required: true,
        validate: [validator.isStrongPassword, "Please enter strong password"]
    },
    adminPhoto: {
        public_id: {
            type: String,
            required: function() {return this.role === 'admin';},
        },
        url: {
            type: String,
            required: function () {return this.role === 'admin';}
        }
    }

},{timestamps: true})

export const User = mongoose.model("User", userSchema)