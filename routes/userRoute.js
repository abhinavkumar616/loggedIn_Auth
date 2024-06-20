const express=require("express")
const userController = require("../controller/userController")
const authenticateToken = require("../middleware/verifyToken")
const userStatus = require("../controller/userStatus")
const getDistance = require("../controller/getDistance")
const testing = require("../controller/testing")
const weekData = require("../controller/weekData")

const router=express.Router()
    
router.post("/user",userController)
router.post("/status",authenticateToken,userStatus)
router.post("/getDistance",authenticateToken,getDistance)
router.post("/weekData",authenticateToken,weekData)
router.post("/testing",testing)

module.exports=router