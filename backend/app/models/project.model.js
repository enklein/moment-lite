const app_userModel = require("./app_user.model");

module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("project", {
    project_uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    project_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    project_description: {
      type: Sequelize.STRING
    },
    project_status: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
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
    tableName: 'project',
    timestamps: false
  });

  return Project;
};