const User = require("../models/User");

//create user

const createUser = (req, res) => {
  const userData = req.body;
  User.createUser(userData, (err, data) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });

    return res.status(200).json({ message: "user created successfully" });
  });
};
//get all users in database
const getAllUsers = (req, res) => {
  User.getAllUsers((err, data) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });

    return res
      .status(200)
      .json({ message: "successfully", data: data });
  });
};

//get single user by id

const getSingleUser = (req,res)=>{
    const {id} = req.params
    User.getOneUser(id,(err,data)=>{
        if (err)
        return res.status(400).json({ message: "error happend", err: err });
  
      return res
        .status(200)
        .json({ message: " successfull", data: data });
    })
}

// update user 

const updateUser = (req,res)=>{
    const {id} = req.params
    const userdata = req.body
    User.updateUser(id,userdata,(err,data)=>{
        if (err)
        return res.status(400).json({ message: "error happend", err: err });
  
      return res
        .status(200)
        .json({ message: "user updated successfully" });
    })
}

// delete user 

const deleteUser = (req,res)=>{
    const {id} = req.params
    User.deleteUser(id,(err,data)=>{
        if (err)
        return res.status(400).json({ message: "error happend", err: err });
  
      return res
        .status(200)
        .json({ message: "user deleted successfully" });
    })
}

//add user to comp 
const addUserToComp = (req,res)=>{
  const userData = req.body;
  User.addUserToComp(userData, (err, data) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });

    return res.status(200).json({ message: "user created successfully" });
  });
}


const changeTeamState = (req,res)=>{
  const id = req.query.id
  User.changeTeamState(id,(err,data)=>{
    if (err)
    return res.status(400).json({ message: "error eweees", err: err });

  return res.status(200).json({ message: "success" });
  })
}

const makeUserAdmin = (req,res)=>{
  const {id} = req.params
  User.makeAdmin(id,(err,data)=>{

    if(err) return res.status(400).json({ message: "error eweees", err: err });

  return res.status(200).json({ message: "success" });
  })
}

const updateScore = (req,res)=>{
  const {id} = req.params
  const score = req.query.score
  User.updateScore(id,score,(err,data)=>{
    if(err) return res.status(400).json({ message: "error eweees", err: err });

    return res.status(200).json({ message: "success" });
  })
}
module.exports = {
  createUser,
  getAllUsers,updateUser,deleteUser,getSingleUser,addUserToComp,changeTeamState,makeUserAdmin,updateScore
};
