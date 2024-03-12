const Team = require("../models/Team");

const getTeamByCode = (req, res) => {
  const team_code = req.query.code;
  Team.getTeamByCode(team_code, (err, data) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });
    return res.status(200).json({ message: "successful", data: data });
  });
};

const addMember = (req, res) => {
  const { team_id, name } = req.body;
  Team.addMember(team_id, name, (err, data) => {
    if (err)
      return res.status(400).json({ message: "error happend", err: err });
    return res.status(200).json({ message: "successful", data: data });
  });
};

module.exports = {
  getTeamByCode,
  addMember,
};
