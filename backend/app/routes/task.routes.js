const { authJwt } = require("../middleware");
const controller = require("../controllers/task.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a task
  app.post(
    "/api/task/",
    [authJwt.verifyToken],
    controller.createTask
  )

  // Update a task by ID
  app.put(
    "/api/task/:task_uuid",
    [authJwt.verifyToken],
    controller.updateTask
  )

  // Delete a task by ID controller.deleteTask
  app.delete(
    "/api/task/:task_uuid",
    [authJwt.verifyToken],
    controller.deleteTask
  )

  // Get all tasks for a given user controller.getAllTasks
  app.get(
    "/api/task/",
    [authJwt.verifyToken],
    controller.getAllTasks
  )

  // Get a specific task by ID controller.getTask
  app.get(
    "/api/task/:task_uuid",
    [authJwt.verifyToken],
    controller.getTask
  )
}