import express from "express"
import apiHomePage from "../controllers/apiHomePage.js"
import useRoute from "./userRoute.js"
import shortenLink from "./shortenLink.js"
const router=express.Router()

router.get("/",apiHomePage.homePage)

//other routes


router.use("/user",useRoute)


router.use("/shorLink",shortenLink)


export default router