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

  // create a new events
  createEvent: (data, callback) => {
    const { event_title, event_des,event_type } = data;
    const query =
      "INSERT INTO `event`(`event_title`, `event_type`, `event_des`) VALUES (?,?,?)";
    db.query(
      query,
      [
        event_title,
        event_type,
        event_des,
      ],
      (err, result) => {
        if (err) return callback(err, null);
        return callback(null, result);
      }
    );
  },

  //delete event by id

  deleteEvent: (id, callback) => {
    const query = "DELETE FROM `event` WHERE event_id  =?";

    db.query(query, [id], (err, data) => {
      if (err) return callback(err, null);
      return callback(null, data);
    });
  },
};

module.exports = Event;
