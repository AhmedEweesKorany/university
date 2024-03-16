const Event = require("../models/Event");

//create event

const createEvent = (req, res) => {
  const {name,des,type,comp} = req.query;
  Event.createEvent(name,des,type,comp ,(err, data) => {
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

const updateEvent = (req,res)=>{
    const {id} = req.params
    const {name,des} = req.query
    Event.updateEvent(id,name,des,(err,data)=>{
        if (err)
        return res.status(400).json({ message: "error happend", err: err });

      return res
        .status(200)
        .json({ message: "event updated successfully" });
    })
}

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
  createEvent,deleteEvent,getAllEvents,getSingleEvent,getEventInComp,updateEvent
};
