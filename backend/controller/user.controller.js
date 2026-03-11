import { User } from "../model/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'


export const register = async (req, res) => {
    try {
        const { fullName, role, email, password } = req.body
        if (!fullName || !role || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            })
        }
        const hashPass = await bcrypt.hash(password, 10);

        //Admin validation
        if (role === 'admin') {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Admin photo is required"
                });
            }

            //Admin photo upload handling
            const {adminPhoto} = req.files;
            const allowedFormat = ['image/jpeg', 'image/png', 'image/webp']
            if (!allowedFormat.includes(adminPhoto.mimetype)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid photo formate. only JPG, PNG & WebP are allowed"
                })
            }

            const cloudResponse = await cloudinary.uploader.upload(adminPhoto.tempFilePath)
            if (!cloudResponse || cloudResponse.error) {
                console.log(cloudResponse.error)
            }
            
            var newUserData = {
                fullName,
                role,
                email,
                password: hashPass,
                adminPhoto: {
                    public_id: cloudResponse.public_id,
                    url: cloudResponse.secure_url
                }
            }
        } else {
            var newUserData = {
                fullName,
                role,
                email,
                password: hashPass
            }
        }

        
        const newUser = new User(newUserData)
        await newUser.save()
        const token = await jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            newUser,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { role, email, password } = req.body;
        if (!role || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        if (role !== user.role) {
            return res.status(400).json({
                success: false,
                message: `Given role ${role} is not found`
            })
        }
        const passMatch = await bcrypt.compare(password, user.password)
        if (!passMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("token", { 
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: "/"
        })
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const profile = async (req, res) => {
    const user = await User.findById(req.user._id)
    res.status(200).json({
        success: true,
        user
    })
}
