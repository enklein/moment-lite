const db = require("../models");
const User = db.app_user;
// console.log(db)
console.log("Logging app_user 0", db.app_user)
checkDuplicateUsernameOrEmail = (req, res, next) => {
  console.log("Logging app_user 1", db.app_user)
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    console.log("Logging app_user 2", db.app_user)
    if (user) {
      res.status(400).send({
        message: "Failed! Username taken."
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        req.status(400).send({
          message: "Failed! Email taken."
        });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
}

module.exports = verifySignUp;