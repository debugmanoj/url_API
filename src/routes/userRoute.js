import express from "express"
import userRoutesController from "../controllers/userRoutesController.js"
const router=express.Router();

router.post("/addUser",userRoutesController.addUser)
router.post("/checkUser",userRoutesController.checkUser)
router.get("/authenticate/:id",userRoutesController.authenticateUser)
router.post("/resetPass",userRoutesController.resetPassword)
router.post("/checkResetPass/:token/:email",userRoutesController.checkResetPass)
router.post("/updatePass/:email",userRoutesController.UpdatePass)

export default router

