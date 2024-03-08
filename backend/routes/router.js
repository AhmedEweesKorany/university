const express = require("express")
const userController = require("../controllers/userController")
const adminController = require("../controllers/adminController")
const cometationController = require("../controllers/competationController")
const eventController = require("../controllers/eventController")

const router = express.Router()

//user operations
router.post("/adduser", userController.createUser);
router.get("/getAllusers",userController.getAllUsers)
router.get("/getoneuser/:id",userController.getSingleUser)
router.put("/updateuser/:id",userController.updateUser)
router.delete("/deleteuser/:id",userController.deleteUser)

//admin operations
router.post("/addadmin", adminController.createAdmin);
router.get("/getalladmins",adminController.getAllAdmins)
router.get("/getoneadmin/:id",adminController.getSingleAdmin)
router.put("/updateadmin/:id",adminController.updateAdmin)
router.delete("/deleteadmin/:id",adminController.deleteAdmin)

//competation operations 

router.get("/getallcomp",cometationController.getAllCompetation)
router.get("/getonecomp/:id",cometationController.getSingleCompetation)
router.post("/createcomp",cometationController.createCompetation)
router.delete("/deletecomp/:id",cometationController.deleteCompetation)

// Event operations
router.get("/getallevents",eventController.getAllEvents)
router.get("/getoneevent/:id",eventController.getSingleEvent)
router.post("/createevent",eventController.createEvent)
router.delete("/deleteevent/:id",eventController.deleteEvent)

module.exports = router