const Admin = require("../models/Admin")

//create admin
const createAdmin = (req,res)=>{
    const AdminData = req.body
    Admin.createAdmin(AdminData,(err,data)=>{
        if(err) return res.status(400).json({message:"error happend",err:err})

        return res.status(200).json({message:"Admin created successfully"})
    })
}
//get all admins in database
const getAllAdmins = (req,res)=>{
    Admin.getAllAdmins((err,data)=>{
        if(err) return res.status(400).json({message:"error happend",err:err})

        return res.status(200).json({message:"Admin created successfully",data:data})
    })
}

//get single admin by id

const getSingleAdmin = (req,res)=>{
    const {id} = req.params
    Admin.getOneAdmin(id,(err)=>{
        if (err)
        return res.status(400).json({ message: "error happend", err: err });
  
      return res
        .status(200)
        .json({ message: " successfull", data: data });
    })
}

// update user 

const updateAdmin = (req,res)=>{
    const {id} = req.params
    const userdata = req.body
    Admin.updateAdmin(id,userdata,(err,data)=>{
        if (err)
        return res.status(400).json({ message: "error happend", err: err });
  
      return res
        .status(200)
        .json({ message: "admin updated successfully" });
    })
}

// delete user 

const deleteAdmin = (req,res)=>{
    const {id} = req.params
    Admin.deleteAdmin(id,(err,data)=>{
        if (err)
        return res.status(400).json({ message: "error happend", err: err });
  
      return res
        .status(200)
        .json({ message: "admin deleted successfully" });
    })
}
module.exports = {
    createAdmin,getAllAdmins,getSingleAdmin,updateAdmin,deleteAdmin
}