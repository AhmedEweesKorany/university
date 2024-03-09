const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, "SecertKey", (err, user) => {
      if (err) {
        return res.status(403).json({ message: "invalid token" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "you are not authorized", code: 401 });
  }
};

module.exports = verify;
