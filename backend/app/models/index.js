const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.app_user = require("./app_user.model.js")(sequelize, Sequelize);
db.app_session = require("./app_session.model.js")(sequelize, Sequelize);
db.task = require("./task.model.js")(sequelize, Sequelize);

// // Test to see if it connection successful
// sequelize.authenticate()
// .then(() => {console.log("success");})
// .catch((error) => {console.log(error);});

module.exports = db;
