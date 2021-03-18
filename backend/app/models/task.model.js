const app_userModel = require("./app_user.model");

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
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    user_uuid: {
      type: Sequelize.UUID,
      references: {
        model: app_userModel,
        key: 'user_uuid'
      }
    }
  }, {
    tableName: 'task',
    timestamps: false
  });

  return Task;
};