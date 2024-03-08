const { query } = require("express");
const db = require("../config/DB");

//create Result model
const Result = {
  // update user score
  updateScore: (points,isteam,id, callback) => {
    if(isteam){
        const qurey = "UPDATE `result` SET `points`=? WHERE team_id = ?"
        db.query(query,[points,id],(err,result)=>{
            if(err) return callback(err,null)
            return callback(null,result)
        })
    }else{
        const qurey = "UPDATE `result` SET `points`=? WHERE user_id = ?"
        db.query(query,[points,id],(err,result)=>{
            if(err) return callback(err,null)
            return callback(null,result)
        })
    }

},
// get all ranked users or teams
getAll: (callback)=>{
    const query = "SELECT * FROM `result`"

    db.query(query,(err,res)=>{
        if(err) return callback(err,null)
        return callback(null,res)
    })
}
};

module.exports = Result;
