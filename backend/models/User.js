const db = require("../config/DB");
const bcrypt = require("bcrypt");

//create user model
const User = {
  //get all users
  getAllUsers: (callback) => {
    const query =
      "SELECT `user_id`, `user_name`, `user_email`, `is_team`,`points` FROM `users` WHERE isAdmin = 0 ORDER BY `points` DESC";
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
    db.query(
      "SELECT * FROM `users` WHERE user_email = ?",
      [email],
      (err, data) => {
        if (err) {
          return callback(err, null);
        }
        if (data && data.length > 0) {
          return callback("User already exists", null);
        } else {
          const hashedPassword = bcrypt.hashSync(password, 10);
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
      }
    );
  },

  // updaet certain user by id
  updateUser: (id, data, callback) => {
    const { username, email, password } = data;
    if (password) {
      const query =
        "UPDATE `users` SET `user_name`=?,`user_email`=?,`user_password`=? WHERE user_id = ?";
      const hashedPassword = bcrypt.hashSync(password, 10);
      db.query(query, [username, email, hashedPassword, id], (err, data) => {
        if (err) return callback(err, null);
        return callback(null, data);
      });
    } else {
      const query =
        "UPDATE `users` SET `user_name`=?,`user_email`=? WHERE user_id = ?";
      db.query(query, [username, email, id], (err, data) => {
        if (err) return callback(err, null);
        return callback(null, data);
      });
    }
  },

  //delete ceratin user by id

  deleteUser: (id, callback) => {
    const query = "DELETE FROM `users` WHERE user_id=?";

    db.query(query, [id], (err, data) => {
      if (err) return callback(err, null);
      return callback(null, data);
    });
  },

  // add user to comp
  addUserToComp: (userdata, callback) => {
    const { id, com_id } = userdata;
    db.query(
      "SELECT * FROM `users_in_competation` WHERE user_id = ? AND competation_id=?",
      [id, com_id],
      (err, data) => {
        if (err) {
          return callback(err, null);
        }
        if (data && data.length > 0) {
          return callback("already applied", null);
        } else {
          const query =
            "INSERT INTO `users_in_competation`( `user_id`, `competation_id`) VALUES (?,?)";
          db.query(query, [id, com_id], (err, result) => {
            if (err) {
              console.log("error:", err);
              return callback(err, null);
            }
            return callback(null, result);
          });
        }
      }
    );
  },
  // change isteam state
  changeTeamState: (id, callback) => {
    const query = "UPDATE `users` SET `is_team` = 1 WHERE user_id = ?";
    db.query(query, [id], (err, data) => {
      if (err) return callback(err, null);

      return callback(null, data);
    });
  },

  makeAdmin: (id, callback) => {
    const query = "UPDATE `users` SET `isAdmin` = 1 WHERE user_id = ?";
    db.query(query, [id], (err, data) => {
      if (err) return callback(err, null);

      return callback(null, data);
    });
  },

  updateScore:(id,points,callback)=>{
    const query = "UPDATE `users` SET `points` = ? WHERE user_id = ?";
    db.query(query,[points,id],(err,data)=>{
      if(err) return callback(err,null)
      return callback(null,data)
    })
  }
};

module.exports = User;
