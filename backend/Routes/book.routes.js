import express from 'express'
import { createBook, getAllBook } from '../controller/book.controller.js'
const router = express.Router()

router.post('/create-book', createBook)
router.get('/all-books', getAllBook)

export default router;