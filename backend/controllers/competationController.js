const Competation = require("../models/Competation");

//create competation

const createCompetation = (req, res) => {
  const compData = req.body;
  Competation.createCompetation(compData, (err, data) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });

    return res.status(200).json({ message: "competation created successfully" });
  });
};
//get all competations in database
const getAllCompetation = (req, res) => {
    Competation.getAllCompetations((err, data) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });

    return res
      .status(200)
      .json({ message: "successfull", data: data });
  });
};

//get single competation by id

const getSingleCompetation = (req,res)=>{
    const {id} = req.params
    Competation.getOneCompetation(id,(err,result)=>{
        if (err)
        return res.status(400).json({ message: "error happend", err: err });
  
      return res
        .status(200)
        .json({ message: " successfull one",data:result });
    })
}

// update competation

// const updateUser = (req,res)=>{
//     const {id} = req.params
//     const userdata = req.body
//     User.updateUser(id,userdata,(err,data)=>{
//         if (err)
//         return res.status(400).json({ message: "error happend", err: err });
  
//       return res
//         .status(200)
//         .json({ message: "user updated successfully" });
//     })
// }

// delete competation 

const deleteCompetation = (req,res)=>{
    const {id} = req.params

    
    Competation.deleteCompetation(id,(err,data)=>{
        if (err)
        return res.status(400).json({ message: "error happend", err: err });
  
      return res
        .status(200)
        .json({ message: "competation deleted successfully" });
    })
}
module.exports = {
  createCompetation,getAllCompetation,getSingleCompetation,deleteCompetation
};
