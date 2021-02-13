const db = require("../models");
const Project = db.project;

exports.createProject = (req, res) => {
  // Create a project
  Project.create({
    project_name: req.body.project_name,
    project_description: req.body.project_description,
    project_status: req.body.project_status,
    user_uuid: req.user_uuid
  })
  .then(
    res.status(201).send({message: "Project was created successfully!"})
  )
  .catch(
    err => {
      res.status(500).send({ message: err.message });
    }
  );
}

exports.updateProject = (req, res) => {
  // Update a project by ID
  let old_project = Project.findOne({
    where: {
      project_uuid: req.params.project_uuid,
      user_uuid: req.user_uuid
    }
  });

  ['project_name', 'project_description', 'project_status', 'user_uuid'].forEach(key => {
    if (req.body[key]) old_project[key] = req.body[key];
  });

  Project.update(
    {
      project_name: old_project['project_name'],
      project_description: old_project['project_description'],
      project_status: old_project['project_status'],
      user_uuid: old_project['user_uuid']
    },
    {
      where: {
        project_uuid: req.params.project_uuid,
        user_uuid: req.user_uuid
      }
    }
  )
  .then(res.status(200).send({message: "Project was updated successfully!"}))
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.deleteProject = (req, res) => {
  // Delete a project by ID
  Project.destroy({
    where: {
      project_uuid: req.params.project_uuid,
      user_uuid: req.user_uuid
    }
  })
  .then(res.status(200).send({message: "Project deleted."}))
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.getAllProjects = (req, res) => {
  // Get all projects for a given user
  Project.findAll({
    where: {
      user_uuid: req.user_uuid
    }
  }).then(projects => {
    if (projects) {
      res.status(201).send(projects);
    }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.getProject = (req, res) => {
  // Get a specific project by ID
  Project.findOne({
    where: {
      project_uuid: req.params.project_uuid,
      user_uuid: req.user_uuid
    }
  }).then(project => {
    res.status(201).send(project)
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}