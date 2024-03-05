const express = require("express")
const userController = require("../controllers/userController")
const adminController = require("../controllers/adminController")
const cometationController = require("../controllers/competationController")

const router = express.Router()

//user operations
router.post("/adduser", userController.createUser);
router.get("/getAllusers",userController.getAllUsers)
router.put("/updateuser/:id",userController.updateUser)
router.delete("/deleteuser/:id",userController.deleteUser)

//admin operations
router.post("/addadmin", adminController.createAdmin);
router.get("/getalladmins",adminController.getAllAdmins)
router.put("/updateadmin/:id",adminController.updateAdmin)
router.delete("/deleteadmin/:id",adminController.deleteAdmin)

//competation operations 

router.get("/getallcomp",cometationController.getAllCompetation)
router.get("/getonecomp/:id",cometationController.getSingleCompetation)
router.post("/createcomp",cometationController.createCompetation)
router.delete("/deletecomp/:id",cometationController.deleteCompetation)

module.exports = router