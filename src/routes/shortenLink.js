import express from "express"
import linkShortener from "../controllers/linkShortener.js"
const router=express.Router()

router.post("/create/:id",linkShortener.createLink)
router.get("/getAll/:id",linkShortener.getAllLink)


export default router