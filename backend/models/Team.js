const { query } = require("express");
const db = require("../config/DB");
const { v4: uuidv4 } = require('uuid');

const Team = {
  create: (data,leader_id, callback) => {
    const  teamName = data;
    const code = uuidv4()
    const query =
      "INSERT INTO `team`(`team_name`,`leader_id`,`team_code`) VALUES (?,?,?)";

    db.query(query, [teamName,leader_id,code], (err, data) => {
      if (err) return callback(err, null);
      return callback(null, data);
    });
  },

  addMember: (team_id, data, callback) => {
    let newMember = data;
    newMember = newMember + ","
    const query =
      "UPDATE `team` SET `team_members`= CONCAT(team_members,?) WHERE team_id = ?";

    db.query(query, [newMember, team_id], (err, data) => {
      if (err) return callback(err, null);
      return callback(null, data);
    });

    db.query(
      "UPDATE `team` SET `current_member`= current_member + 1  WHERE team_id = ?",
      [team_id]
    );
  },
// remove a member from team
  removeMember: (team_id, memberName, callback) => {
    let originalString = "";
    let substringToRemove = memberName;
    db.query(
      "SELECT  `team_members` FROM `team` WHERE team_id=?",
      [team_id],
      (err, data) => {
        if (err) {
          console.log("error happend on remove member from team");
        } else {
          originalString = data;
        }
      }
    );

    // Create a regular expression to match the substring to remove
    let regex = new RegExp(substringToRemove + ",", "g");

    // Replace the substring with an empty string
    let modifiedString = originalString.replace(regex, "");

    db.query("UPDATE `team` SET `team_members`=? WHERE team_id=?",[modifiedString,team_id],(err,result)=>{
        if(err) return callback(err,null)
        return callback(null,result)
    });

    // remove member from counter 
    db.query(
        "UPDATE `team` SET `current_member`= current_member - 1  WHERE team_id = ?",
        [team_id]
      );
  },

  // get all teams
  getAllteams:(callback)=>{
    db.query("SELECT `team_id`, `team_name`, `team_members`, `team_code` , `team_points` FROM `team`",(err,result)=>{
        if(err) return callback(err,null)
        return callback(null,result)
    })

  },

  //get single team by id
  getSingleTeam:(team_name,callback)=>{
    db.query("SELECT * FROM `team` WHERE team_name = ?",[team_name],(err,data)=>{
      if(err) return callback(err,null)
      return callback(null,data)
    })
  },


  getTeamByCode : (code,callback)=>{
    db.query("SELECT * FROM `team` WHERE team_code = ?",[code],(err,data)=>{
      if(err) return callback(err,null)
      return callback(null,data)
    })
  },
  deleteTeam : (id,callback)=>{
    db.query("DELETE FROM `team` WHERE team_id = ?",[id],(err,data)=>{
      if(err) return callback(err,null)
      return callback(null,data)
    })
  },
  updateScore:(id,points,callback)=>{
    const query = "UPDATE `team` SET `team_points` = ? WHERE team_id = ?";
    db.query(query,[points,id],(err,data)=>{
      if(err) return callback(err,null)
      return callback(null,data)
    })
  },

  // get Team_id by leader_id
  getTeam_id :(leader_id,callback)=>{
    db.query("SELECT `team_id` FROM `team` WHERE `leader_id` = ?",[leader_id],(err,data)=>{
      if(err) return callback(err,null)
      return callback(null,data)
    })
  },
  //get team by leader id
  getTeamByLeader: (id, team_id, comp_id, callback) => {
    db.query("SELECT * FROM `team` WHERE `leader_id`=?", [id], (err, data) => {
      if (err) return callback(err, null);
      let isApplied = false;
      db.query("SELECT * FROM `team_in_competation` WHERE `team_id` = ? AND `competation_id` = ?", [team_id, comp_id], (err, result) => {
        if (result.length > 0) isApplied = true;
  
        if (isApplied) {
          return callback("Already Applied in this Competition", null);
        } else if (data.length == 0) {
          return callback("leader only can apply", null);
        } else {
          const query = "INSERT INTO `team_in_competation`(`team_id`, `competation_id`) VALUES (?,?)";
          db.query(query, [team_id, comp_id], (err, insertResult) => {
            if (err) return callback(err, null);
            return callback(null, insertResult);
          });
        }
      });
    });
  }
  
};

module.exports = Team;
