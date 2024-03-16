const db = require("../config/DB");

//create Event model
const Event = {
  //get all event
  getAllEvents: (callback) => {
    const query = "SELECT * FROM `event`";
    db.query(query, (err, result) => {
      if (err) return callback(err, null);

      return callback(null, result);
    });
  },

  // get only one event by id
  getOneEvent: (id, callback) => {
    const query = "SELECT * FROM `event` WHERE event_id = ?";
    db.query(query, [id], (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  // get events in specific competation
  getEventWithComp: (id, callback) => {
    const query = "SELECT * FROM `event` WHERE competation_id = ?";
    db.query(query, [id], (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },
  // create a new events
  createEvent: (name,des,type,comp, callback) => {
   
    const query =
      "INSERT INTO `event`(`event_title`, `event_type`, `event_des`,`competation_id`) VALUES (?,?,?,?)";
    db.query(query, [name,type,des,comp], (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  //delete event by id

  deleteEvent: (id, callback) => {
    const query = "DELETE FROM `event` WHERE event_id  =?";

    db.query(query, [id], (err, data) => {
      if (err) return callback(err, null);
      return callback(null, data);
    });
  },

  //update event
  updateEvent: (id, name,des, callback) => {

    db.query("UPDATE `event` SET `event_title`= ? ,`event_des`= ? WHERE event_id = ?",[name,des,id],(err,data)=>{
      if(err) return callback(err,null)
      return callback(null,data)
    });
  },
};

module.exports = Event;
