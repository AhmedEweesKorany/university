const express = require("express");
const userController = require("../controllers/userController");
const cometationController = require("../controllers/competationController");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");
const router = express.Router();
const verify = require("../middleware/Verify");

//user operations
router.post("/adduser", userController.createUser);
router.get("/getAllusers", userController.getAllUsers);
router.get("/getoneuser/:id", userController.getSingleUser);
router.put("/updateuser/:id", userController.updateUser);
router.delete("/deleteuser/:id", userController.deleteUser);

//competation operations

router.get("/getallcomp", cometationController.getAllCompetation);
router.get("/getonecomp/:id", cometationController.getSingleCompetation);
router.post("/createcomp", cometationController.createCompetation);
router.delete("/deletecomp/:id", cometationController.deleteCompetation);

// Event operations
router.get("/getallevents", eventController.getAllEvents);
router.get("/getoneevent/:id", eventController.getSingleEvent);
router.post("/createevent", eventController.createEvent);
router.delete("/deleteevent/:id", eventController.deleteEvent);

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
