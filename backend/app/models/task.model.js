const projectModel = require("./project.model");

module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    task_uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    task_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    task_status: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    project_uuid: {
      type: Sequelize.UUID,
      references: {
        model: projectModel,
        key: 'project_uuid'
      }
    }
  }, {
    tableName: 'task'
  });

  return Task;
};