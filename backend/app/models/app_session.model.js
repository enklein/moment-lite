const app_userModel = require("./app_user.model");
const taskModel = require("./task.model");

module.exports = (sequelize, Sequelize) => {
  const App_Session = sequelize.define("app_session", {
    session_uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    session_start: {
      type: Sequelize.DATE,
      allowNull: false
    },
    session_end: {
      type: Sequelize.DATE,
    },
    session_note: {
      type: Sequelize.STRING
    },
    user_uuid: {
      type: Sequelize.UUID,
      references: {
        model: app_userModel,
        key: 'user_uuid'
      }
    },
    task_uuid: {
      type: Sequelize.UUID,
      references: {
        model: taskModel,
        key: 'task_uuid'
      }
    }
  }, {
    tableName: 'app_session',
    timestamps: false
  });

  return App_Session;
};
