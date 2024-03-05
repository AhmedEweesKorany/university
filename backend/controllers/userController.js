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
      .json({ message: "user created successfully", data: data });
  });
};

//get single user by id

const getSingleUser = (req,res)=>{
    const {id} = req.params
    User.getOneUser(id,(err)=>{
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
module.exports = {
  createUser,
  getAllUsers,updateUser,deleteUser
};
