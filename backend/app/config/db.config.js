module.exports = {
  HOST: "localhost",
  USER: "backend_user",
  PASSWORD: "osc4rm3y3r",
  DB: "moment_db",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};