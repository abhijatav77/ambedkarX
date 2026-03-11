import { v2 as cloudinary } from 'cloudinary'
import { Book } from '../model/book.model.js'


export const createBook = async(req, res) => {
    try {
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        };
        const {image} = req.files
        const allowedFormat = ["image/jpeg", "image/png", "image/webp"]
        if(!allowedFormat.includes(image.mimetype)){
            return res.status(400).json({
                success: false,
                message: "Invalid photo formate. Only JPG, PNG and Webp are allowed"
            })
        }
        const {title, author, about} = req.body;
        if(!title || !author || !about){
            return res.status(400).json({
                success: false,
                message: "title, author and about are required"
            })
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(
            image.tempFilePath
        )
        if(!cloudinaryResponse || cloudinaryResponse.error) {
            return res.status(400).json({
                success: false,
                message: "Image upload failed"
            })
        }

        const bookData = await Book.create({
            title,
            author,
            about,
            image: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            }
        })

        res.status(200).json({
            success: true,
            message: "Book upload successfully",
            bookData
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllBook = async(req, res) => {
    const allBooks = await Book.find()
    res.status(200).json({allBooks})
}