const db = require("../config/DB");
const bcrypt = require("bcrypt");

//create user model
const User = {
  //get all users
  getAllUsers: (callback) => {
    const query = "SELECT * FROM `users`";
    db.query(query, (err, result) => {
      if (err) return callback(err, null);

      return callback(null, result);
    });
  },

  // get only one user by id
  getOneUser: (id, callback) => {
    const query = "SELECT * FROM `users` WHERE user_id = ?";
    db.query(query, [id], (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  // create a new user
  createUser: (userdata, callback) => {
    const { username, email, password } = userdata;
    db.query("SELECT * FROM `users` WHERE user_email = ?",[email],(err,data)=>{
        if(err) {
            return callback(err, null);
        }
        if(data && data.length > 0){
            return callback("User already exists", null);
        } else {
            const hashedPassword =  bcrypt.hashSync(password, 10);
            const query =
              "INSERT INTO `users`( `user_name`, `user_email`, `user_password`) VALUES (?,?,?)";
            db.query(query, [username, email, hashedPassword], (err, result) => {
              if (err) {
                console.log("error:", err);
                return callback(err, null);
              }
              return callback(null, result);
            });
        }  
    });
},


  // updaet certain user by id
  updateUser: (id, data, callback) => {
    const { username, email, password } = data;
    if (password) {
      const query =
        "UPDATE `users` SET `user_name`=?,`user_email`=?,`user_password`=? WHERE user_id = ?";
      const hashedPassword = bcrypt.hashSync(password, 10);
      db.query(query, [username, email, hashedPassword,id], (err, data) => {
        if (err) return callback(err, null);
        return callback(null, data);
      });
    } else {
      const query =
        "UPDATE `users` SET `user_name`=?,`user_email`=? WHERE user_id = ?";
      db.query(query, [username, email,id], (err, data) => {
        if (err) return callback(err, null);
        return callback(null, data);
      });
    }
  },

  //delete ceratin user by id

  deleteUser: (id, callback) => {
    const query = "DELETE FROM `users` WHERE user_id=?";

    db.query(query,[id],(err,data)=>{
        if(err) return callback(err,null)
        return callback(null,data)
    })
  },
};

module.exports = User;
