const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.user_uuid = decoded.user_uuid;
    // req.username = decoded.username; // this will need to have the username added into the token on creation in auth.controller
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;