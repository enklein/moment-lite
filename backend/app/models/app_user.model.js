module.exports = (sequelize, Sequelize) => {
  const App_User = sequelize.define("app_user", {
    user_uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    tableName: 'app_user'
  });

  return App_User;
};
