const db = require("../config/DB");

//create competation model
const Competation = {
  //get all competation
  getAllCompetations: (callback) => {
    const query = "SELECT * FROM `competation`";
    db.query(query, (err, result) => {
      if (err) return callback(err, null);

      return callback(null, result);
    });
  },

  // get only one competation by id
  getOneCompetation: (id, callback) => {
    const query = "SELECT * FROM `competation` WHERE competation_id = ?";
    db.query(query, [id], (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  // create a new competation
  createCompetation: (data, callback) => {
    const { competation_name, competation_category, competation_author,competation_image } = data;
    const query =
      "INSERT INTO `competation`( `competation_name`, `competation_category`, `competation_author`, `competation_image`) VALUES (?,?,?,?)";
    db.query(query, [competation_name,competation_category, competation_author,competation_image], (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  //delete compeatation by id

  deleteCompetation: (id, callback) => {
    const query = "DELETE FROM `competation` WHERE competation_id  =?";

    db.query(query, [id], (err, data) => {
      if (err) return callback(err, null);
      return callback(null, data);
    });
  },
};

module.exports = Competation;
