const db = require("../config/DB");

const Team = {
  create: (data, callback) => {
    const { teamName, teamMembers } = data;
    // const memArr = teamMembers.split(",");
    // db.query("UPDATE `team` SET `current_member`= current_member + 1 WHERE 1");
    // if (memArr.length > 0) {
    // }
    const query =
      "INSERT INTO `team`(`team_name`, `team_members`) VALUES (?,?)";

    db.query(query, [teamName, teamMembers], (err, data) => {
      if (err) return callback(err, null);
      return callback(null, data);
    });
  },
  addMember: (team_id, data, callback) => {
    const { newMember } = data;
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
    db.query("SELECT * FROM `team`",(err,result)=>{
        if(err) return callback(err,null)
        return callback(null,result)
    })

  },

  //get single team by id
  getSingleTeam:(team_id,callback)=>
  db.query("SELECT * FROM `team` WHERE team_id = ?",[team_id],(err,data)=>{
    if(err) return callback(err,null)
    return callback(null,data)
  })
};

module.exports = Team;
