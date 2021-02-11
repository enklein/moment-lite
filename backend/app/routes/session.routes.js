const { authJwt } = require("../middleware");
const controller = require("../controllers/session.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  // get all sessions
  app.get(
    "/api/user/session/all",
    [authJwt.verifyToken],
    controller.getAllSessions
  );

  // get specific sessions
  app.get(
    "/api/user/session/:session_id",
    [authJwt.verifyToken],
    controller.getSession
  )

  // create a new session
  app.post(
    "/api/user/session/new",
    [authJwt.verifyToken],
    controller.newSession
  )

  // update a session
  app.put(
    "/api/user/session/update/:id",
    [authJwt.verifyToken],
    controller.updateSession
  )
};