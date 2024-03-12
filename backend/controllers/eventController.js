const Event = require("../models/Event");

//create event

const createEvent = (req, res) => {
  const compData = req.body;
  Event.createEvent(compData, (err, data) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });

    return res.status(200).json({ message: "events created successfully" });
  });
};
//get all event in database
const getAllEvents = (req, res) => {
  Event.getAllEvents((err, data) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });

    return res.status(200).json({ message: "successfull", data: data });
  });
};

//get single event by id

const getSingleEvent = (req, res) => {
  const { id } = req.params;
  Event.getOneEvent(id, (err,result) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });

    return res.status(200).json({ message: " successfull one",data:result });
  });
};

// get event with specifc compeation
const getEventInComp = (req, res) => {
  const { id } = req.params;
  Event.getEventWithComp(id, (err,result) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });

    return res.status(200).json({ message: " successfull one",data:result });
  });
};


// update event

// const updateUser = (req,res)=>{
//     const {id} = req.params
//     const userdata = req.body
//     User.updateUser(id,userdata,(err,data)=>{
//         if (err)
//         return res.status(400).json({ message: "error happend", err: err });

//       return res
//         .status(200)
//         .json({ message: "user updated successfully" });
//     })
// }

// delete event

const deleteEvent = (req, res) => {
  const { id } = req.params;

  Event.deleteEvent(id, (err, data) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });

    return res
      .status(200)
      .json({ message: "Event deleted successfully" });
  });
};
module.exports = {
  createEvent,deleteEvent,getAllEvents,getSingleEvent,getEventInComp
};
