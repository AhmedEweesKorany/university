const express = require("express");
const userController = require("../controllers/userController");
const cometationController = require("../controllers/competationController");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController")
const router = express.Router();
const verify = require("../middleware/Verify");

//user operations
router.post("/adduser", userController.createUser);
router.get("/getAllusers", userController.getAllUsers);
router.get("/getoneuser/:id", userController.getSingleUser);
router.put("/updateuser/:id", userController.updateUser);
router.put("/makeadmin/:id",userController.makeUserAdmin)
router.delete("/deleteuser/:id", userController.deleteUser);
router.post("/addusertocomp",userController.addUserToComp)
router.get("/changeteamstate",userController.changeTeamState)
router.get("/updatescore/:id",userController.updateScore)

//teams operations 

router.get("/getteambycode",teamController.getTeamByCode)
router.get("/getteambyname",teamController.getTeamByName)
router.get("/createteam",teamController.createTeam)
router.get("/getallteams",teamController.getAllTeams)
router.delete("/deleteteam/:id",teamController.deleteTeam)
router.post("/addmembertoteam",teamController.addMember)
router.get("/updateteamscore/:id",teamController.updateScore)
router.get("/getteambyleader/:id",teamController.getTeamByLeader)
router.get("/getteamid/:id",teamController.getTeam_id)
//competation operations

router.get("/getallcomp", cometationController.getAllCompetation);
router.get("/getonecomp/:id", cometationController.getSingleCompetation);
router.get("/createcomp", cometationController.createCompetation);
router.delete("/deletecomp/:id", cometationController.deleteCompetation);
router.get("/compnamebyid/:id",cometationController.getCompnambyId)

// Event operations
router.get("/getallevents", eventController.getAllEvents);
router.get("/getoneevent/:id", eventController.getSingleEvent);
router.get("/geteventincomp/:id", eventController.getEventInComp);
router.get("/createevent", eventController.createEvent);
router.delete("/deleteevent/:id", eventController.deleteEvent);
router.get("/updateevent/:id",eventController.updateEvent)

// login and register
router.post("/api/login", authController.userLogin);
router.delete("/api/user/:userID", verify, (req, res) => {
  if (
    req.user.id == req.params.userID ||
    req.user.isAdmin ||
    req.user.isSuper
  ) { 
    res
      .status(200)
      .json({ message: "user has been delted after verfying token" });
  } else {
    res.status(401).json({ message: "ypu aren't allowed to delte this user" });
  }
});

module.exports = router;
