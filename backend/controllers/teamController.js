const Team = require("../models/Team");

const getTeamByCode = (req, res) => {
  const team_code = req.query.code;
  Team.getTeamByCode(team_code, (err, data) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });
    return res.status(200).json({ message: "successful", data: data });
  });
};

const addMember = (req, res) => {
  const { team_id, name } = req.body;
  Team.addMember(team_id, name, (err, data) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });
    return res.status(200).json({ message: "successful", data: data });
  });
};

const createTeam = (req,res)=>{
  const teamName = req.query.name
  const leader_id = req.query.leader_id

  Team.create(teamName,leader_id,(err,data)=>{
    if(err) return res.status(400).json({message:"error happend",err:err})
    return res.status(200).json({message:"team created succesfully"})
})
}


const getTeamByName = (req,res) =>{
  const TeamName = req.query.name
  Team.getSingleTeam(TeamName,(err,data)=>{
    if(err) return res.status(400).json({message:"error happend",err:err})
    return res.status(200).json({message:"success",data:data})
  })
}

const getAllTeams = (req,res)=>{
  Team.getAllteams((err,data)=>{
    if(err) return res.status(400).json({message:"error happend",err:err})
    return res.status(200).json({message:"success",data:data})
  })
}

const deleteTeam = (req,res)=>{
  const {id} = req.params
  Team.deleteTeam(id,(err,data)=>{
    if(err) return res.status(400).json({message:"error happend",err:err})
    return res.status(200).json({message:"success"})
  })
}

const updateScore = (req,res)=>{
  const {id} = req.params
  const score = req.query.score
  Team.updateScore(id,score,(err,data)=>{
    if(err) return res.status(400).json({ message: "error eweees", err: err });

    return res.status(200).json({ message: "success" });
  })
}

const getTeamByLeader = (req,res)=>{
  const {id} = req.params
  const {team_id,comp_id} = req.query
  Team.getTeamByLeader(id,team_id,comp_id,(err,data)=>{

    if(err) return res.status(400).json({ message: "error eweees", err: err });

    return res.status(200).json({ message: "success",data:data });
  })
}

const getTeam_id = (req,res)=>{
  const {id} = req.params
  Team.getTeam_id(id,(err,data)=>{
    if(err) return res.status(400).json({ message: "error eweees", err: err });

    return res.status(200).json({ message: "success",data:data });
  })
}
module.exports = {
  getTeamByCode,
  addMember,
  createTeam,getTeamByName,getAllTeams,deleteTeam,updateScore,getTeamByLeader,getTeam_id
};
