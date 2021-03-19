const db = require("../models");
const Task = db.task;
const Session = db.app_session;

Task.hasMany(Session, { foreignKey: { name: 'task_uuid', allowNull: true }});
Session.belongsTo(Task, { foreignKey: { name: 'task_uuid', allowNull: true }});

exports.createTask = (req, res) => {
  // Create a task
  Task.create({
    task_name: req.body.task_name,
    task_status: req.body.task_status,
    user_uuid: req.user_uuid
  })
  .then(
    res.status(201).send({message: "Task was created successfully!"})
  )
  .catch(
    err => {
      res.status(500).send({ message: err.message });
    }
  );
}

exports.updateTask = (req, res) => {
  // Update a task by ID
  let old_task = Task.findOne({
    where: {
      task_uuid: req.params.task_uuid,
      user_uuid: req.user_uuid
    }
  });

  ['task_name', 'task_status', 'user_uuid', 'project_uuid'].forEach(key => {
    if (req.body[key]) old_task[key] = req.body[key];
  });

  Task.update(
    {
      task_name: old_task['task_name'],
      task_status: old_task['task_status'],
      user_uuid: old_task['user_uuid']
    },
    {
      where: {
        task_uuid: req.params.task_uuid,
        user_uuid: req.user_uuid
      }
    }
  )
  .then(res.status(200).send({message: "Task was updated successfully!"}))
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.deleteTask = (req, res) => {
  // Delete a task by ID
  Task.destroy({
    where: {
      task_uuid: req.params.task_uuid,
      user_uuid: req.user_uuid
    }
  })
  .then(res.status(200).send({message: "Task deleted."}))
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.getAllTasks = (req, res) => {
  // Get all tasks for a given user
  Task.findAll({
    where: {
      user_uuid: req.user_uuid
    },
    include: [{
      model: Session
    }]
  }).then(tasks => {
    if (tasks) {
      console.log(tasks)
      res.status(201).send(tasks);
    }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.getTask = (req, res) => {
  // Get a specific task by ID
  Task.findOne({
    where: {
      task_uuid: req.params.task_uuid,
      user_uuid: req.user_uuid
    }
  }).then(task => {
    res.status(201).send(task)
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}