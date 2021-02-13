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
    "/api/session/",
    [authJwt.verifyToken],
    controller.getAllSessions
  );

  // get specific sessions
  app.get(
    "/api/session/:session_uuid",
    [authJwt.verifyToken],
    controller.getSession
  )

  // create a new session
  app.post(
    "/api/session",
    [authJwt.verifyToken],
    controller.newSession
  )

  // update a session
  app.put(
    "/api/session/:session_uuid",
    [authJwt.verifyToken],
    controller.updateSession
  )

  app.delete(
    "/api/session/:session_uuid",
    [authJwt.verifyToken],
    controller.deleteSession
  )
};