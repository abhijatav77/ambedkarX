import express from 'express'
import { createBio, deleteBio, getAllBio, getBio, updateBio } from '../controller/bio.controller.js'
import { isAdmin, isAuthenticated } from '../middleware/auth.middleware.js'
const router = express.Router()

router.post("/create-bio",isAuthenticated, isAdmin, createBio)
router.put("/update/:id",isAuthenticated, isAdmin, updateBio)
router.delete("/delete/:id",isAuthenticated, isAdmin, deleteBio)
router.get("/all-bio", getAllBio)
router.get("/:id", getBio)


export default router;