import express from 'express'
import 'dotenv/config'
import { main } from './database/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './Routes/user.routes.js'
import bookRouter from './Routes/book.routes.js'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary';
import bioRouter from './Routes/bio.routes.js'

const app = express()

const PORT = process.env.PORT 

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'https://ambedkar-x.vercel.app',
    credentials: true
}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))



//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})


//Routes
app.use("/api/users", userRouter)
app.use("/api/books", bookRouter)
app.use("/api/bio", bioRouter)



main()
.then(()=>{
    app.listen(PORT, ()=> {
        console.log(`Server running on port no ${PORT}`)
    })
})
.catch((error)=> {
    throw Error(error.message)
})