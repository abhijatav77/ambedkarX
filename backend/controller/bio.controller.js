import { v2 as cloudinary } from 'cloudinary';
import { Bio } from '../model/bio.model.js';

export const createBio = async (req, res) => {
    try {
        const { name, identity, longBio, shortBio } = req.body;
        if (!name || !identity || !longBio || !shortBio) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(401).json({
                success: false,
                message: "Bio image is required"
            })
        }
        const { bioImage } = req.files;

        const allowFormat = ["image/jpeg", "image/png", "image/webp"]

        if (!allowFormat.includes(bioImage.mimetype)) {
            return res.status(400).json({
                success: false,
                message: "Invalid photo format. Only the JPG, PNG & Webp are allowed"
            })
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(
            bioImage.tempFilePath
        )

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error)
        }

        const bioData = await Bio.create({
            name,
            identity,
            longBio,
            shortBio,
            bioImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url
            }
        })

        console.log(bioData)

        res.status(200).json({
            success: true,
            message: "Bio added successfully",
            bioData
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateBio = async (req, res) => {
    try {
        const { id } = req.params;
        const bio = await Bio.findById(id)
        if (!bio) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const { name, identity, longBio, shortBio } = req.body;
        let imageData = bio.bioImage;

        if (req.files && req.files.bioImage) {
            const file = req.files.bioImage;

            if (bio.bioImage.public_id) {
                await cloudinary.uploader.destroy(bio.bioImage.public_id)
            }

            const uploaded = await cloudinary.uploader.upload(file.tempFilePath)

            imageData = {
                public_id: uploaded.public_id,
                url: uploaded.secure_url
            }
        }

        const updateBio = await Bio.findByIdAndUpdate(
            id, { name, identity, longBio, shortBio, bioImage: imageData }, { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Bio updated successfully",
            bio: updateBio
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteBio = async(req, res) => {
    try {
        const {id} = req.params;
        const bio = await Bio.findByIdAndDelete(id)
        if(!bio){
            return res.status(400).json({
                success: false,
                message: "Biography not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Biography deleted successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getBio = async (req, res) => {
    try {
        const { id } = req.params;

        const bio = await Bio.findById(id)

        if (!bio) {
            return res.status(400).json({
                success: false,
                message: "Biography not found"
            })
        }

        res.status(201).json({
            success: true,
            bio
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllBio = async (req, res) => {
    const allBio = await Bio.find();
    res.status(200).json({ allBio })
}