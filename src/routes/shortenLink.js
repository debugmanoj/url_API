import express from "express"
import linkShortener from "../controllers/linkShortener.js"
const router=express.Router()

router.post("/create/:name",linkShortener.createLink)
router.get("/getAll/:name",linkShortener.getAllLink)


export default router