const db = require("../config/DB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Auth = {
  login: (data, callback) => {
    const { email, password } = data;
    const query = "SELECT * FROM `users` WHERE user_email = ?";

    db.query(query, [email], (err, userData) => {
      if (err) {
        return callback(err, null);
      } else {
        if (userData.length === 0) {
          // No user found with the provided username
          return callback("User not found", null);
        }

        const user = userData[0];

        // Compare passwords asynchronously
        bcrypt.compare(password, user.user_password, (bcryptErr, isMatch) => {
          if (bcryptErr) {
            return callback(bcryptErr, null);
          }
          if (isMatch) {
            // correct password
            // genrate access token
            const accessToken = jwt.sign({
                id:user.user_id,isAdmin:user.isAdmin,isSuper:user.isSuper,username:user.user_name,email:user.user_email,isTeam:user.is_team
            }, "SecertKey");
            return callback(null, {
                username:user.user_name,
                isAdmin:user.isAdmin,
                isSuper:user.isSuper,
                accessToken
            });
          } else {
            // Passwords don't match
            return callback("Invalid password", null);
          }
        });
      }
    });
  },
};

module.exports = Auth;
