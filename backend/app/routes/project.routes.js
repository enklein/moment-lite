const { authJwt } = require("../middleware");
const controller = require("../controllers/project.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a project
  app.post(
    "/api/project/",
    [authJwt.verifyToken],
    controller.createProject
  )

  // Update a project by ID
  app.put(
    "/api/project/:project_uuid",
    [authJwt.verifyToken],
    controller.updateProject
  )

  // Delete a project by ID
  app.delete(
    "/api/project/:project_uuid",
    [authJwt.verifyToken],
    controller.deleteProject
  )

  // Get all projects for a given user
  app.get(
    "/api/project/",
    [authJwt.verifyToken],
    controller.getAllProjects
  )

  // Get a specific project by ID
  app.get(
    "/api/project/:project_uuid",
    [authJwt.verifyToken],
    controller.getProject
  )
}