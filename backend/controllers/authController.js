const Auth = require("../models/Auth");
const jwt = require("jsonwebtoken");
const userLogin = (req, res) => {
  const data = req.body;
  Auth.login(data, (err, data) => {
    if (err)
      return res.status(400).json({ message: "error happend!!", err: err });
    return res.status(200).json({ message: "successful", data: data });
  });
};


module.exports = {
  userLogin
};
