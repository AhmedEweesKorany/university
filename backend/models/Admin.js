const db = require("../config/DB");
const bcrypt = require("bcrypt");

//create admin model
const Admin = {
  //get all admin
  getAllAdmins: (callback) => {
    const query = "SELECT * FROM `admin`";
    db.query(query, (err, result) => {
      if (err) return callback(err, null);

      return callback(null, result);
    });
  },

  // get only one admin by id
  getOneAdmin: (id, callback) => {
    const query = "SELECT * FROM `admin` WHERE admin_id = ?";
    db.query(query, [id], (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  // create a new admin
  createAdmin:  (userdata, callback) => {
    const { username, email, password } = userdata;
    const hashedPassword =  bcrypt.hashSync(password, 10);
    const query =
      "INSERT INTO `admin`( `admin_name`, `admin_email`, `admin_password`) VALUES (?,?,?)";
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  // updaet certain admin by id
  updateAdmin: (id, data, callback) => {
    const { username, email, password } = data;
    if (password) {
      const query =
        "UPDATE `admin` SET `admin_name`=?,`admin_email`=?,`admin_password`=? WHERE admin_id = ?";
      const hashedPassword = bcrypt.hashSync(password, 10);
      db.query(query, [username, email, hashedPassword,id], (err, data) => {
        if (err) return callback(err, null);
        return callback(null, data);
      });
    } else {
      const query =
        "UPDATE `admin` SET `admin_name`=?,`admin_email`=? WHERE admin_id = ?";
      db.query(query, [username, email,id], (err, data) => {
        if (err) return callback(err, null);
        return callback(null, data);
      });
    }
  },

  //delete ceratin admin by id

  deleteAdmin: (id, callback) => {
    const query = "DELETE FROM `admin` WHERE admin_id=?";

    db.query(query,[id],(err,data)=>{
        if(err) return callback(err,null)
        return callback(null,data)
    })
  },
};

module.exports = Admin;
